//x成分とy成分を持つ二次元ベクトル
export class Vector {
    /**
     * コンストラクター
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * ベクトルのxとyをセットする
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * ベクトルの複製
     */
    clone() {
        return new Vector(this.x, this.y);
    }
    /**
     * ベクトルの足し算 : 渡されたベクトルのxとyを自分に足す
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * ベクトルの引き算 : 渡されたベクトルのxとyを自分から引く
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * ベクトルの向きを変更して速度を乗算する
     */
    setFromScalarAngle(speed, angle) {
        this.x = Math.cos(angle) * speed;
        this.y = Math.sin(angle) * speed;
    }
    /**
     * xとyの引数を受けとり、それぞれベクトルxとyに加算する
     */
    addFromScalar(x, y) {
        this.x += x;
        this.y += y;
    }
}