<?php

namespace Wrench\Protocol;

use Wrench\Payload\Payload;

use Wrench\Exception\BadRequestException;

use \Exception;
use \InvalidArgumentException;

/**
 * Definitions and implementation helpers for the Wrenchs protocol
 *
 * Based on RFC 6455: http://tools.ietf.org/html/rfc6455
 */
abstract class Protocol
{
    /**#@+
     * Relevant schemes
     *
     * @var string
     */
    const SCHEME_WEBSOCKET         = 'ws';
    const SCHEME_WEBSOCKET_SECURE  = 'wss';
    const SCHEME_UNDERLYING        = 'tcp';
    const SCHEME_UNDERLYING_SECURE = 'tls';
    /**#@-*/

    /**#@+
     * HTTP headers
     *
     * @var string
     */
    const HEADER_HOST       = 'Host';
    const HEADER_KEY        = 'Sec-WebSocket-Key';
    const HEADER_PROTOCOL   = 'Sec-WebSocket-Protocol';
    const HEADER_VERSION    = 'Sec-WebSocket-Version';
    const HEADER_ACCEPT     = 'Sec-WebSocket-Accept';
    const HEADER_EXTENSIONS = 'Sec-WebSocket-Extensions';
    const HEADER_ORIGIN     = 'Origin';
    const HEADER_CONNECTION = 'Connection';
    const HEADER_UPGRADE    = 'Upgrade';
    /**#@-*/

    /**#@+
     * HTTP error statuses
     *
     * @var int
     */
    const HTTP_SWITCHING_PROTOCOLS = 101;
    const HTTP_BAD_REQUEST         = 400;
    const HTTP_UNAUTHORIZED        = 401;
    const HTTP_FORBIDDEN           = 403;
    const HTTP_NOT_FOUND           = 404;
    const HTTP_RATE_LIMITED        = 420;
    const HTTP_SERVER_ERROR        = 500;
    const HTTP_NOT_IMPLEMENTED     = 501;
    /**#@-*/

    /**#@+
     * Close statuses
     *
     * @see http://tools.ietf.org/html/rfc6455#section-7.4
     * @var int
     */
    const CLOSE_NORMAL            = 1000;
    const CLOSE_GOING_AWAY        = 1001;
    const CLOSE_PROTOCOL_ERROR    = 1002;
    const CLOSE_DATA_INVALID      = 1003;
    const CLOSE_RESERVED          = 1004;
    const CLOSE_RESERVED_NONE     = 1005;
    const CLOSE_RESERVED_ABNORM   = 1006;
    const CLOSE_DATA_INCONSISTENT = 1007;
    const CLOSE_POLICY_VIOLATION  = 1008;
    const CLOSE_MESSAGE_TOO_BIG   = 1009;
    const CLOSE_EXTENSION_NEEDED  = 1010;
    const CLOSE_UNEXPECTED        = 1011;
    const CLOSE_RESERVED_TLS      = 1015;
    /**#@-*/

    /**#@+
     * Frame types
     *
     *  %x0 denotes a continuation frame
     *  %x1 denotes a text frame
     *  %x2 denotes a binary frame
     *  %x3-7 are reserved for further non-control frames
     *  %x8 denotes a connection close
     *  %x9 denotes a ping
     *  %xA denotes a pong
     *  %xB-F are reserved for further control frames
     *
     * @var int
     */
    const TYPE_CONTINUATION = 0;
    const TYPE_TEXT         = 1;
    const TYPE_BINARY       = 2;
    const TYPE_RESERVED_3   = 3;
    const TYPE_RESERVED_4   = 4;
    const TYPE_RESERVED_5   = 5;
    const TYPE_RESERVED_6   = 6;
    const TYPE_RESERVED_7   = 7;
    const TYPE_CLOSE        = 8;
    const TYPE_PING         = 9;
    const TYPE_PONG         = 10;
    const TYPE_RESERVED_11  = 11;
    const TYPE_RESERVED_12  = 12;
    const TYPE_RESERVED_13  = 13;
    const TYPE_RESERVED_14  = 14;
    const TYPE_RESERVED_15  = 15;
    /**#@-*/

    /**
     * Magic GUID
     *
     * Used in the WebSocket accept header
     *
     * @var string
     */
    const MAGIC_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

    /**
     * The request MUST contain an |Upgrade| header field whose value
     *   MUST include the "websocket" keyword.
     */
    const UPGRADE_VALUE = 'websocket';

    /**
     * The request MUST contain a |Connection| header field whose value
     *   MUST include the "Upgrade" token.
     */
    const CONNECTION_VALUE = 'Upgrade';

    /**
     * Request line format
     *
     * @var string printf compatible, passed request path string
     */
    const REQUEST_LINE_FORMAT = 'GET %s HTTP/1.1';

    /**
     * Request line regex
     *
     * Used for parsing requested path
     *
     * @var string preg_* compatible
     */
    const REQUEST_LINE_REGEX = '/^GET (\S+) HTTP\/1.1$/';

    /**
     * Response line format
     *
     * @var string
     */
    const RESPONSE_LINE_FORMAT = 'HTTP/1.1 %d %s';

    /**
     * Header line format
     *
     * @var string printf compatible, passed header name and value
     */
    const HEADER_LINE_FORMAT = '%s: %s';

    /**
     * Valid schemes
     *
     * @var array<string>
     */
    protected static $schemes = array(
        self::SCHEME_WEBSOCKET,
        self::SCHEME_WEBSOCKET_SECURE,
        self::SCHEME_UNDERLYING,
        self::SCHEME_UNDERLYING_SECURE
    );

    /**
     * Close status codes
     *
     * @var array<int => string>
     */
    public static $closeReasons = array(
        self::CLOSE_NORMAL            => 'normal close',
        self::CLOSE_GOING_AWAY        => 'going away',
        self::CLOSE_PROTOCOL_ERROR    => 'protocol error',
        self::CLOSE_DATA_INVALID      => 'data invalid',
        self::CLOSE_DATA_INCONSISTENT => 'data inconsistent',
        self::CLOSE_POLICY_VIOLATION  => 'policy violation',
        self::CLOSE_MESSAGE_TOO_BIG   => 'message too big',
        self::CLOSE_EXTENSION_NEEDED  => 'extension needed',
        self::CLOSE_UNEXPECTED        => 'unexpected error',
        self::CLOSE_RESERVED          => null, // Don't use these!
        self::CLOSE_RESERVED_NONE     => null,
        self::CLOSE_RESERVED_ABNORM   => null,
        self::CLOSE_RESERVED_TLS      => null
    );

    /**
     * Frame types
     *
     * @todo flip values and keys?
     * @var array<string => int>
     */
    public static $frameTypes = array(
        'continuation' => self::TYPE_CONTINUATION,
        'text'         => self::TYPE_TEXT,
        'binary'       => self::TYPE_BINARY,
        'close'        => self::TYPE_CLOSE,
        'ping'         => self::TYPE_PING,
        'pong'         => self::TYPE_PONG
    );

    /**
     * HTTP errors
     *
     * @var array<int => string>
     */
    public static $httpResponses = array(
        self::HTTP_SWITCHING_PROTOCOLS => 'Switching Protocols',
        self::HTTP_BAD_REQUEST         => 'Bad Request',
        self::HTTP_UNAUTHORIZED        => 'Unauthorized',
        self::HTTP_FORBIDDEN           => 'Forbidden',
        self::HTTP_NOT_FOUND           => 'Not Found',
        self::HTTP_NOT_IMPLEMENTED     => 'Not Implemented',
        self::HTTP_RATE_LIMITED        => 'Enhance Your Calm'
    );

    /**
     * Gets a version number
     *
     * @return
     */
    abstract public function getVersion();

    /**
     * Subclasses should implement this method and return a boolean to the given
     * version string, as to whether they would like to accept requests from
     * user agents that specify that version.
     *
     * @return boolean
     */
    abstract public function acceptsVersion($version);

    /**
     * Gets a payload instance, suitable for use in decoding/encoding protocol
     * frames
     *
     * @return Payload
     */
    abstract public function getPayload();

    /**
     * Generates a key suitable for use in the protocol
     *
     * This base implementation returns a 16-byte (128 bit) random key as a
     * binary string.
     *
     * @return string
     */
    public function generateKey()
    {
        if (extension_loaded('openssl')) {
            $key = openssl_random_pseudo_bytes(16);
        } else {
            // SHA1 is 128 bit (= 16 bytes)
            $key = sha1(spl_object_hash($this) . mt_rand(0, PHP_INT_MAX) . uniqid('', true), true);
        }

        return base64_encode($key);
    }

    /**
     * Gets request handshake string
     *
     *   The leading line from the client follows the Request-Line format.
     *   The leading line from the server follows the Status-Line format.  The
     *   Request-Line and Status-Line productions are defined in [RFC2616].
     *
     *   An unordered set of header fields comes after the leading line in
     *   both cases.  The meaning of these header fields is specified in
     *   Section 4 of this document.  Additional header fields may also be
     *   present, such as cookies [RFC6265].  The format and parsing of
     *   headers is as defined in [RFC2616].
     *
     * @param string $uri    WebSocket URI, e.g. ws://example.org:8000/chat
     * @param string $key    16 byte binary string key
     * @param string $origin Origin of the request
     * @return string
     */
    public function getRequestHandshake(
        $uri,
        $key,
        $origin,
        array $headers = array()
    ) {
        if (!$uri || !$key || !$origin) {
            throw new InvalidArgumentException('You must supply a URI, key and origin');
        }

        list($scheme, $host, $port, $path) = self::validateUri($uri);

        $handshake = array(
            sprintf(self::REQUEST_LINE_FORMAT, $path)
        );

        $headers = array_merge(
            $this->getDefaultRequestHeaders(
                $host . ':' . $port, $key, $origin
            ),
            $headers
        );

        foreach ($headers as $name => $value) {
            $handshake[] = sprintf(self::HEADER_LINE_FORMAT, $name, $value);
        }
        return implode($handshake, "\r\n") . "\r\n\r\n";
    }

    /**
     * Gets a handshake response body
     *
     * @param string $key
     * @param array $headers
     */
    public function getResponseHandshake($key, array $headers = array())
    {
        $headers = array_merge(
            $this->getSuccessResponseHeaders(
                $key
            ),
            $headers
        );

        return $this->getHttpResponse(self::HTTP_SWITCHING_PROTOCOLS, $headers);
    }

    /**
     * Gets a response to an error in the handshake
     *
     * @param int|Exception $e Exception or HTTP error
     * @param array $headers
     */
    public function getResponseError($e, array $headers = array())
    {
        $code = false;

        if ($e instanceof Exception) {
            $code = $e->getCode();
        } elseif (is_numeric($e)) {
            $code = (int)$e;
        }

        if (!$code || $code < 400 || $code > 599) {
            $code = self::HTTP_SERVER_ERROR;
        }

        return $this->getHttpResponse($code, $headers);
    }

    /**
     * Gets an HTTP response
     *
     * @param int $status
     * @param array $headers
     */
    protected function getHttpResponse($status, array $headers = array())
    {
        if (array_key_exists($status, self::$httpResponses)) {
            $response = self::$httpResponses[$status];
        } else {
            $response = self::$httpResponses[self::HTTP_NOT_IMPLEMENTED];
        }

        $handshake = array(
            sprintf(self::RESPONSE_LINE_FORMAT, $status, $response)
        );

        foreach ($headers as $name => $value) {
            $handshake[] = sprintf(self::HEADER_LINE_FORMAT, $name, $value);
        }

        return implode($handshake, "\r\n") . "\r\n\r\n";
    }

    /**
     * @todo better header handling
     * @todo throw exception
     * @param unknown_type $response
     * @param unknown_type $key
     * @return boolean
     */
    public function validateResponseHandshake($response, $key)
    {
        if (!$response) {
            return false;
        }

        $headers = $this->getHeaders($response);

        if (!isset($headers[self::HEADER_ACCEPT])) {
            throw new HandshakeException('No accept header receieved on handshake response');
        }

        $accept = $headers[self::HEADER_ACCEPT];

        if (!$accept) {
            throw new HandshakeException('Invalid accept header');
        }

        $expected = $this->getAcceptValue($key);

        preg_match('#Sec-WebSocket-Accept:\s(.*)$#mU', $response, $matches);
        $keyAccept = trim($matches[1]);

        return ($keyAccept === $this->getEncodedHash($key)) ? true : false;
    }

    /**
     * Gets an encoded hash for a key
     *
     * @param string $key
     * @return string
     */
    public function getEncodedHash($key)
    {
        return base64_encode(pack('H*', sha1($key . self::MAGIC_GUID)));
    }

    /**
     * Validates a request handshake
     *
     * @param string $request
     * @throws BadRequestException
     */
    public function validateRequestHandshake(
        $request
    ) {
        if (!$request) {
            return false;
        }

        list($request, $headers) = $this->getRequestHeaders($request);
        // make a copy of the headers array to store all extra headers
        $extraHeaders = $headers;

        // parse the resulting url to separate query parameters from the path
        $url = parse_url($this->validateRequestLine($request));
        $path = isset($url['path']) ? $url['path'] : null;
        $urlParams = array();
        if (isset($url['query'])) {
            parse_str($url['query'], $urlParams);
        }

        if (empty($headers[self::HEADER_ORIGIN])) {
            throw new BadRequestException('No origin header');
        } else {
            unset($extraHeaders[self::HEADER_ORIGIN]);
        }

        $origin = $headers[self::HEADER_ORIGIN];

        if (!isset($headers[self::HEADER_UPGRADE])
                || strtolower($headers[self::HEADER_UPGRADE]) != self::UPGRADE_VALUE
        ) {
            throw new BadRequestException('Invalid upgrade header');
        } else {
            unset($extraHeaders[self::HEADER_UPGRADE]);
        }

        if (!isset($headers[self::HEADER_CONNECTION])
                || stripos($headers[self::HEADER_CONNECTION], self::CONNECTION_VALUE) === false
        ) {
            throw new BadRequestException('Invalid connection header');
        } else {
            unset($extraHeaders[self::HEADER_CONNECTION]);
        }

        if (!isset($headers[self::HEADER_HOST])) {
            // @todo Validate host == listening socket? Or would that break
            //        TCP proxies?
            throw new BadRequestException('No host header');
        } else {
            unset($extraHeaders[self::HEADER_HOST]);
        }

        if (!isset($headers[self::HEADER_VERSION])) {
            throw new BadRequestException('No version header received on handshake request');
        }

        if (!$this->acceptsVersion($headers[self::HEADER_VERSION])) {
            throw new BadRequestException('Unsupported version: ' . $version);
        } else {
            unset($extraHeaders[self::HEADER_VERSION]);
        }

        if (!isset($headers[self::HEADER_KEY])) {
            throw new BadRequestException('No key header received');
        }

        $key = trim($headers[self::HEADER_KEY]);

        if (!$key) {
            throw new BadRequestException('Invalid key');
        } else {
            unset($extraHeaders[self::HEADER_KEY]);
        }

        // Optional
        $protocol = null;
        if (isset($headers[self::HEADER_PROTOCOL])) {
            $protocol = $headers[self::HEADER_PROTOCOL];
            unset($extraHeaders[self::HEADER_PROTOCOL]);
        }

        $extensions = array();
        if (!empty($headers[self::HEADER_EXTENSIONS])) {
            $extensions = $headers[self::HEADER_EXTENSIONS];
            if (is_scalar($extensions)) {
                $extensions = array($extensions);
            }
        }
        unset($extraHeaders[self::HEADER_EXTENSIONS]);

        return array($path, $origin, $key, $extensions, $protocol, $extraHeaders, $urlParams);
    }

    /**
     * Gets a suitable WebSocket close frame
     *
     * @param Exception|int $e
     */
    public function getCloseFrame($e)
    {
        $code = false;

        if ($e instanceof Exception) {
            $code = $e->getCode();
        } elseif (is_numeric($e)) {
            $code = (int)$e;
        }

        if (!$code || !key_exists($code, self::$closeReasons)) {
            $code = self::CLOSE_UNEXPECTED;
        }

        $body = pack('n', $code) . self::$closeReasons[$code];

        $payload = $this->getPayload();
        return $payload->encode($body, self::TYPE_CLOSE);
    }

    /**
     * Validates a WebSocket URI
     *
     * @param string $uri
     * @return array(string $scheme, string $host, int $port, string $path)
     */
    public function validateUri($uri)
    {
        $uri = (string)$uri;
        if (!$uri) {
            throw new InvalidArgumentException('Invalid URI');
        }

        $scheme = parse_url($uri, PHP_URL_SCHEME);
        $this->validateScheme($scheme);

        $host = parse_url($uri, PHP_URL_HOST);
        if (!$host) {
            throw new InvalidArgumentException("Invalid host");
        }

        $port = parse_url($uri, PHP_URL_PORT);
        if (!$port) {
            $port = $this->getPort($scheme);
        }

        $path = parse_url($uri, PHP_URL_PATH);
        if (!$path) {
            throw new InvalidArgumentException('Invalid path');
        }

        return array($scheme, $host, $port, $path);
    }

    /**
     * Validates a socket URI
     *
     * @param string $uri
     * @throws InvalidArgumentException
     * @return array(string $scheme, string $host, string $port)
     */
    public function validateSocketUri($uri)
    {
        $uri = (string)$uri;
        if (!$uri) {
            throw new InvalidArgumentException('Invalid URI');
        }

        $scheme = parse_url($uri, PHP_URL_SCHEME);
        $scheme = $this->validateScheme($scheme);

        $host = parse_url($uri, PHP_URL_HOST);
        if (!$host) {
            throw new InvalidArgumentException("Invalid host");
        }

        $port = parse_url($uri, PHP_URL_PORT);
        if (!$port) {
            $port = $this->getPort($scheme);
        }

        return array($scheme, $host, $port);
    }

    /**
     * Validates an origin URI
     *
     * @param string $origin
     * @throws InvalidArgumentException
     * @return string
     */
    public function validateOriginUri($origin)
    {
        $origin = (string)$origin;
        if (!$origin) {
            throw new InvalidArgumentException('Invalid URI');
        }

        $scheme = parse_url($origin, PHP_URL_SCHEME);
        if (!$scheme) {
            throw new InvalidArgumentException('Invalid scheme');
        }

        $host = parse_url($origin, PHP_URL_HOST);
        if (!$host) {
            throw new InvalidArgumentException("Invalid host");
        }

        return $origin;
    }

    /**
     * Validates a request line
     *
     * @param string $line
     * @throws BadRequestException
     */
    protected function validateRequestLine($line)
    {
        $matches = array(0 => null, 1 => null);

        if (!preg_match(self::REQUEST_LINE_REGEX, $line, $matches) || !$matches[1]) {
            throw new BadRequestException('Invalid request line', 400);
        }

        return $matches[1];
    }

    /**
     * Gets the expected accept value for a handshake response
     *
     * Note that the protocol calls for the base64 encoded value to be hashed,
     * not the original 16 byte random key.
     *
     * @see http://tools.ietf.org/html/rfc6455#section-4.2.2
     * @param string $key
     */
    protected function getAcceptValue($encoded_key)
    {
        return base64_encode(sha1($encoded_key . self::MAGIC_GUID, true));
    }

    /**
     * Gets the headers from a full response
     *
     * @param string $response
     * @return array()
     * @throws InvalidArgumentException
     */
    protected function getHeaders($response, &$request_line = null)
    {
        $parts = explode("\r\n\r\n", $response, 2);

        if (count($parts) != 2) {
            $parts = array($parts, '');
        }

        list($headers, $body) = $parts;

        $return = array();
        foreach (explode("\r\n", $headers) as $header) {
            $parts = explode(': ', $header, 2);
            if (count($parts) == 2) {
                list($name, $value) = $parts;
                if (!isset($return[$name])) {
                    $return[$name] = $value;
                } else {
                    if (is_array($return[$name])) {
                        $return[$name][] = $value;
                    } else {
                        $return[$name] = array($return[$name], $value);
                    }
                }
            }
        }

        return $return;
    }

    /**
     * Gets request headers
     *
     * @param string $response
     * @return array<string, array<string>> The request line, and an array of
     *             headers
     * @throws InvalidArgumentException
     */
    protected function getRequestHeaders($response)
    {
        $eol = stripos($response, "\r\n");

        if ($eol === false) {
            throw new InvalidArgumentException('Invalid request line');
        }

        $request = substr($response, 0, $eol);
        $headers = $this->getHeaders(substr($response, $eol + 2));

        return array($request, $headers);
    }

    /**
     * Validates a scheme
     *
     * @param string $scheme
     * @return string Underlying scheme
     * @throws InvalidArgumentException
     */
    protected function validateScheme($scheme)
    {
        if (!$scheme) {
            throw new InvalidArgumentException('No scheme specified');
        }
        if (!in_array($scheme, self::$schemes)) {
            throw new InvalidArgumentException(
                'Unknown socket scheme: ' . $scheme
            );
        }

        if ($scheme == self::SCHEME_WEBSOCKET_SECURE) {
            return self::SCHEME_UNDERLYING_SECURE;
        }
        return self::SCHEME_UNDERLYING;
    }

    /**
     * Gets the default request headers
     *
     * @param string $host
     * @param string $key
     * @param string $origin
     * @param int $version
     * @return multitype:unknown string NULL
     */
    protected function getDefaultRequestHeaders($host, $key, $origin)
    {
        return array(
            self::HEADER_HOST       => $host,
            self::HEADER_UPGRADE    => self::UPGRADE_VALUE,
            self::HEADER_CONNECTION => self::CONNECTION_VALUE,
            self::HEADER_KEY        => $key,
            self::HEADER_ORIGIN     => $origin,
            self::HEADER_VERSION    => $this->getVersion()
        );
    }

    /**
     * Gets the default response headers
     *
     * @param string $key
     */
    protected function getSuccessResponseHeaders($key)
    {
        return array(
            self::HEADER_UPGRADE    => self::UPGRADE_VALUE,
            self::HEADER_CONNECTION => self::CONNECTION_VALUE,
            self::HEADER_ACCEPT     => $this->getAcceptValue($key)
        );
    }

    /**
     * Gets the default port for a scheme
     *
     * By default, the WebSocket Protocol uses port 80 for regular WebSocket
     *  connections and port 443 for WebSocket connections tunneled over
     *  Transport Layer Security
     *
     * @param string $uri
     * @return int
     */
    protected function getPort($scheme)
    {
        if ($scheme == self::SCHEME_WEBSOCKET) {
            return 80;
        } elseif ($scheme == self::SCHEME_WEBSOCKET_SECURE) {
            return 443;
        } elseif ($scheme == self::SCHEME_UNDERLYING) {
            return 80;
        } elseif ($scheme == self::SCHEME_UNDERLYING_SECURE) {
            return 443;
        } else {
            throw new InvalidArgumentException('Unknown websocket scheme');
        }
    }
}