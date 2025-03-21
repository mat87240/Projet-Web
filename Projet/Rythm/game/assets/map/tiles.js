export function generateTiles(data) {
    const tiles = [];
    let x = 0, y = 0, currentAngle = 0;
    let lastPointX = 0, lastPointY = 0;

    // Initialize the first tile
    tiles.push({
        x, y,
        angle: currentAngle,
        id: 1,
        tA: 0,
        points: calculate4PointTile(x, y, currentAngle),
        fadding: 1
    });

    // Iterate through the tile data to generate each tile
    for (let i = 2; i < data.Tiles.length; i++) {
        const newX = lastPointX, newY = lastPointY;
        const tileData = data.Tiles[i]; 
        const tA = tileData.angle ?? 0;
    
        // Create new tile with either 4 or 6 points depending on angle tA
        const newTile = {
            x: newX, y: newY,
            angle: currentAngle,
            id: i,
            tA,
            points: tA === 0
                ? calculate4PointTile(newX, newY, currentAngle)
                : calculate6PointPrism(newX, newY, currentAngle, tA),
            fadding: 1
        };

        // Update the reference point for the next tile
        if (newTile.points.length === 4) {
            lastPointX = newTile.points[2].x;
            lastPointY = newTile.points[2].y;
        } else {
            lastPointX = newTile.points[4].x;
            lastPointY = newTile.points[4].y;
        }

        tiles.push(newTile);
        currentAngle += tA; // Update the current angle for the next tile
    }
    
    return tiles;
}

/**
 * Calculates the four corner points of a tile based on its position and rotation.
 */
function calculate4PointTile(k1, y1, t) {
    const rad = (Math.PI / 180) * t;
    return [
        { x: k1 + 50 * Math.sin(rad), y: y1 + 50 * Math.cos(rad) }, // Top left
        { x: k1, y: y1 }, // Bottom left (reference point)
        { x: k1 + 100 * Math.cos(rad), y: y1 - 100 * Math.sin(rad) }, // Bottom right
        { x: k1 + 100 * Math.cos(rad) + 50 * Math.sin(rad), y: y1 + 50 * Math.cos(rad) - 100 * Math.sin(rad) } // Top right
    ];
}

/**
 * Calculates the six points of a prism-shaped tile.
 */
function calculate6PointPrism(x1, y1, t, t2) {
    const radT = (Math.PI / 180) * t;
    const radT2 = (Math.PI / 180) * (t + t2);

    let points = [
        { x: x1, y: y1 }, // Origin point
        { x: x1 + 50 * Math.sin(radT), y: y1 + 50 * Math.cos(radT) }, // First extension
        { x: x1 + 50 * Math.cos(radT) + 50 * Math.sin(radT), y: y1 + 50 * Math.cos(radT) - 50 * Math.sin(radT) },
        { x: x1 + 50 * Math.cos(radT), y: y1 - 50 * Math.sin(radT) },
        { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) }, // Edge connection
        { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2) + 50 * Math.sin(radT2), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) + 50 * Math.cos(radT2) },
        { x: x1 + 50 * Math.cos(radT) + 50 * Math.sin(radT2), y: y1 - 50 * Math.sin(radT) + 50 * Math.cos(radT2) } // Final point
    ];

    // Check for intersections and adjust points if necessary
    const intersection = calculateIntersection(points);
    if (intersection) points.push(intersection);
    
    return points;
}

/**
 * Finds the intersection between two segments if they exist.
 */
function calculateIntersection(points) {
    const P1 = points[1], P2 = points[2], P5 = points[5], P6 = points[6];

    const dx1 = P1.x - P2.x, dy1 = P1.y - P2.y;
    const dx2 = P5.x - P6.x, dy2 = P5.y - P6.y;

    const det = dx1 * dy2 - dy1 * dx2;

    // If determinant is 0, lines are parallel (no intersection)
    if (det === 0) return null;

    const dx3 = P5.x - P1.x, dy3 = P5.y - P1.y;
    const t = (dx3 * dy2 - dy3 * dx2) / det;

    return { x: P1.x + t * dx1, y: P1.y + t * dy1 };
}
