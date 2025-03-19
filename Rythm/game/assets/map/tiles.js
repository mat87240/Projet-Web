export function generateTiles(data) {
    const tiles = [];
    let x = 0;
    let y = 0;
    let currentAngle = 0;
    let lastPointX = 0;
    let lastPointY = 0;

    tiles.push({
        x: x,
        y: y,
        angle: currentAngle,
        id: 1,
        tA: 0,
        points: calculate4PointTile(x, y, currentAngle),
        fadding: 1
    });

    for (let i = 2; i < data.Tiles.length; i++) {
        const newX = lastPointX;
        const newY = lastPointY;
        const tileData = data.Tiles[i]; 
        const tA = tileData.angle ?? 0;
    
        const rad = (Math.PI / 180) * currentAngle;
    
        const newTile = {
            x: newX,
            y: newY,
            angle: currentAngle,
            id: i,
            tA: tA,
            points: tA === 0
                ? calculate4PointTile(newX, newY, currentAngle)
                : calculate6PointPrism(newX, newY, currentAngle, tA),
            fadding: 1
        };

        let specificPoint;

        
        if (newTile.points.length === 4) {
            specificPoint = newTile.points[2];
        } else {
            specificPoint = newTile.points[4];
            
        }

         lastPointX = specificPoint.x;
         lastPointY = specificPoint.y;

        console.log(`Last Point Coordinates: x = ${lastPointX}, y = ${lastPointY}`);
    
        tiles.push(newTile);
    
        currentAngle += tA;
    
        x = newX;
        y = newY;
    }
    
    return tiles;
    
    
}
 
function calculate4PointTile(k1, y1, t) {
    const rad = (Math.PI / 180) * t;
    const points = [
        { x: k1 + 50 * Math.sin(rad), y: y1 + 50 * Math.cos(rad) },
        { x: k1, y: y1 },
        { x: k1 + 100 * Math.cos(rad), y: y1 - 100 * Math.sin(rad) },
        { x: k1 + 100 * Math.cos(rad) + 50 * Math.sin(rad), y: y1 + 50 * Math.cos(rad) - 100 * Math.sin(rad) }
    ];
    return points;
}

function calculate6PointPrism(x1, y1, t, t2) {
    const radT = (Math.PI / 180) * t;
    const radT2 = (Math.PI / 180) * (t + t2);

    let points;


    if (t2 >= 0) {
        points = [
            { x: x1, y: y1 },
            { x: x1 + 50 * Math.sin(radT), y: y1 + 50 * Math.cos(radT) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.sin(radT), y: y1 + 50 * Math.cos(radT) - 50 * Math.sin(radT) },
            { x: x1 + 50 * Math.cos(radT), y: y1 - 50 * Math.sin(radT) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2) + 50 * Math.sin(radT2), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) + 50 * Math.cos(radT2) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.sin(radT2), y: y1 - 50 * Math.sin(radT) + 50 * Math.cos(radT2) }
        ];
    } else {
        points = [
            { x: x1, y: y1 },
            { x: x1 + 50 * Math.sin(radT), y: y1 + 50 * Math.cos(radT) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.sin(radT), y: y1 + 50 * Math.cos(radT) - 50 * Math.sin(radT) },
            { x: x1 + 50 * Math.cos(radT), y: y1 - 50 * Math.sin(radT) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2) - 50 * Math.sin(radT2) + 50 * Math.sin(radT) + 50 * Math.sin(radT2), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) - 50 * Math.cos(radT2) + 50 * Math.cos(radT) + 50 * Math.cos(radT2) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2) - 50 * Math.sin(radT2) + 50 * Math.sin(radT), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) - 50 * Math.cos(radT2) + 50 * Math.cos(radT) },
            { x: x1 + 50 * Math.cos(radT) + 50 * Math.cos(radT2) - 50 * Math.sin(radT2) + 50 * Math.sin(radT), y: y1 - 50 * Math.sin(radT) - 50 * Math.sin(radT2) - 50 * Math.cos(radT2) + 50 * Math.cos(radT) }
        ];
    }
    
    

    const intersection = calculateIntersection(points);

    if (intersection) {
        points.push(intersection);
    }

    return points;
}


function calculateIntersection(points) {
    const P1 = points[1];
    const P2 = points[2];
    const P5 = points[5];
    const P6 = points[6];

    const dx1 = P1.x - P2.x;
    const dy1 = P1.y - P2.y;
    const dx2 = P5.x - P6.x;
    const dy2 = P5.y - P6.y;

    const det = dx1 * dy2 - dy1 * dx2;

    if (det === 0) {
        if (dx1 === 0 && dx2 === 0) {
            return null;
        }
        if (dy1 === 0 && dy2 === 0) {
            return null; 
        }
        return null;
    }

    const dx3 = P5.x - P1.x;
    const dy3 = P5.y - P1.y;

    const t = (dx3 * dy2 - dy3 * dx2) / det;

    const intersectionX = P1.x + t * dx1;
    const intersectionY = P1.y + t * dy1;
    console.log(intersectionX + " " + intersectionY)

    return { x: intersectionX, y: intersectionY };
}

 