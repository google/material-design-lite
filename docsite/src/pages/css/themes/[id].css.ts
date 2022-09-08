import { COLORS, generateTokens } from '../../../utils/color';
import type { APIContext } from 'astro';

export function getStaticPaths() {
    const routes = [];
    for (const color of COLORS) {
        routes.push({ params: { id: color.name } });
    }
    return routes;
}

export async function get({ params, request }: APIContext) {
    const id = params.id;
    const value = COLORS.find((color) => color.name === id)!.value;
    const result = generateTokens(value);
    return { body: result };
}
