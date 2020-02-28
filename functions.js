normalize_point = (point) => {
    return [map(point[0], 0, width, 0, 1), map(point[1], 0, height, 0, 1),1]
}

sign = (x) => {
    return x >= 0 ? 1 : -1
}