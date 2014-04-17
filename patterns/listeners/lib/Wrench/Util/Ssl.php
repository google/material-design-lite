<?php

namespace Wrench\Util;

class Ssl
{
	/**
	 * Generates a new PEM File given the informations
	 *
	 * @param string $pem_file                 the path of the PEM file to create
	 * @param string $pem_passphrase           the passphrase to protect the PEM
     *                                             file or if you don't want to
     *                                             use a passphrase
	 * @param string $country_name             the country code of the new PEM file. e.g.: EN
	 * @param string $state_or_province_name   the state or province name of the new PEM file
	 * @param string $locality_name            the name of the locality
	 * @param string $organisation_name        the name of the organisation. e.g.: MyCompany
	 * @param string $organisational_unit_name the organisation unit name
	 * @param string $commonName               the common name
	 * @param string $email_address            the email address
	 */
	public static function generatePemFile($pem_file, $pem_passphrase, $country_name, $state_or_province_name,
		$locality_name, $organization_name, $organizational_unit_name, $common_name, $email_address)
	{
		// Generate PEM file
		$dn = array(
			'countryName'            => $country_name,
			'stateOrProvinceName'    => $state_or_province_name,
			'localityName'           => $locality_name,
			'organizationName'       => $organization_name,
			'organizationalUnitName' => $organizational_unit_name,
			'commonName'             => $common_name,
			'emailAddress'           => $email_address
		);

		$privkey = openssl_pkey_new();
		$cert    = openssl_csr_new($dn, $privkey);
		$cert    = openssl_csr_sign($cert, null, $privkey, 365);

		$pem = array();

		openssl_x509_export($cert, $pem[0]);

		if ($pem_passphrase !== null) {
			openssl_pkey_export($privkey, $pem[1], $pem_passphrase);
		}

		$pem = implode($pem);
		file_put_contents($pem_file, $pem);
	}
}