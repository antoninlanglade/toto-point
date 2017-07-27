export default class Point {
  /**
   * @param {Number} [x]
   * @param {Number} [y]
   * @param {Number} [z]
   * @constructor
   */
  constructor(x, y, z) {
      this.x = parseFloat(x) || 0;
      this.y = parseFloat(y) || 0;
      this.z = parseFloat(z) || 0;
  }

  /**
   * Return a copy
   * @return {Point}
   */
  clone() {
      return new Point(this.x, this.y, this.z);
  }

  ////////// DISTANCE //////////

  /**
   * Get distance between 2 points
   * @param {Point} point
   * @return {Number}
   */
  distance(point) {
      return Math.sqrt(this.distanceSquared(point));
  }

  /**
   * Get magnitude between 2 position (distance without sqrt)
   * @param {Point} point
   * @returns {number}
   */
  distanceSquared(point) {
      return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) + Math.pow(this.z - point.z, 2);
  }

  /**
   * Return the distance from a point to a segment
   * @param {Point} p1 the start of the segment
   * @param {Point} p2 end of the segment
   * @return {Number} the distance from the given point to the segment
   */
  distanceWithSegment(p1, p2) {
      return this.distance(this.pointWithSegement(p1, p2));
  }

  /**
   * Return the nearest point for a segment
   * @param {Point} p1 the start of the segment
   * @param {Point} p2 end of the segment
   * @return {Point}
*/
  pointWithSegement(p1, p2) {
    var l2 = p1.distanceSquared(p2);
    if (l2 == 0) return p1;
    var t = ((this.x - p1.x) * (p2.x - p1.x) + (this.y - p1.y) * (p2.y - p1.y)) / l2;
    if (t < 0) return p1;
    if (t > 1) return p2;
    return new Point(p1.x + t * (p2.x - p1.x), p1.y + t * (p2.y - p1.y));
  }

  ////////// VECTOR //////////

  /**
   * Get vector between two points
   * @params {Point} point
   * @return {Point}
   */
  vectorWithPoint(point) {
      return new Point(point.x - this.x, point.y - this.y);
  }

  /**
   * Get point 2D from a vector and a distance
   * @params {Point} vector
   * @params {number} distance
   * @return {Point}
   */
  pointWithVectorAndDistance(vector, distance) {
      var angle = Math.atan2(vector.y, vector.x);
      return new Point(distance * Math.cos(angle) + this.x,distance * Math.sin(angle) + this.y);
  }

  ////////// ANGLE //////////
  /**
   * Get angle between 2 points
   * @param {Point} point
   */
  angleFromPoint(point) {
      return Math.atan2(( point.y - this.y),(point.x - this.x)) * 180 / Math.PI;
  }

  /**
   * Get angle from startpoint and 2 points
   * @param {Point} p1
   * @param {Point} p2
   * @return {number}
   */
  angleWithPoints(p1, p2) {
      var a = p1.distance(p2),
          b = this.distance(p1),
          c = this.distance(p2);
      return Math.acos((Math.pow(a, 2) - Math.pow(b, 2) - Math.pow(c, 2)) / (-2 * b * c)) * 180 / Math.PI;
  }

  /**
   * Rotate the point around 0;0
   * @param {} angle
   */
  pointWithRotation(angle) {
    angle = angle * Math.PI / 180;
      return new Point(
          this.x * Math.cos(angle) + this.y * Math.sin(angle),
          - this.x * Math.sin(angle) + this.y * Math.cos(angle)
      );
  }

  /**
   * Get a point from an another destination point and an angle
   * @param {radian} angle
   * @param {float} distance
   */
  pointWithAngleAndDistance(angle, distance) {
    angle = angle * Math.PI / 180;
    return { x: distance * Math.cos(angle) + this.x, y: distance * Math.sin(angle) + this.y };
  }


  ////////// INTERVAL //////////
  /**
   * Get a number of interval points between two points
   * @param {Point} p // second point
   * @param {Int} quantity // number of points
   */
  getIntervalPoints(p1, p2, quantity) {
    const points = [];
    const ydiff = p2.y - p1.y;
    const xdiff = p2.x - p1.x;
    const slope = (p2.y - p1.y) / (p2.x - p1.x);
    let x;
    let y;

    for (let i = 0; i < quantity; i++) {
      y = slope === 0 ? 0 : ydiff * (i / quantity);
      x = slope === 0 ? xdiff * (i / quantity) : y / slope;
      points.push(new Point(x + p1.x, y + p1.y ));
    }

    points[quantity] = p2.clone();
    return points;
  }

  ////////// ZONE TEST //////////
  /**
   * Test if the points is in a triangle
   * @param {Point} p1
   * @param {Point} p2
   * @param {Point} p3
   * @return {Boolean}
   */
  isContainInTriangle(p1, p2, p3) {
      var b1 = this._sign(this, p1, p2) < 0,
          b2 = this._sign(this, p2, p3) < 0,
          b3 = this._sign(this, p3, p1) < 0;
      return ((b1 == b2) && (b2 == b3));
  }

  ////////// SIGN //////////
  /**
   * Get sign from 3 points
   * @param {Point} p1 // first point
   * @param {Point} p2 // second point
   * @param {Point} p3 // third point
   */
  _sign(p1, p2, p3) {
      return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  }
}
