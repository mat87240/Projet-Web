let jsonCache = null;

export async function loadJsonData(level) {
    if (!jsonCache) {
        try {
            const filePath = `../globalAssets/levels/${level}/${level}.json`;

            const response = await fetch(filePath);
            jsonCache = await response.json();
        } catch (error) {
            console.error(`Error loading ${level}.json:`, error);
            jsonCache = {};
        }
    }
    return jsonCache;
}

export function getTiles() {
    if (!jsonCache) {
        console.error('JSON data not loaded yet');
        return [];
    }
    return jsonCache.Tiles || [];
}
