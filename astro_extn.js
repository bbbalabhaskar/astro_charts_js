function createChart(tagName, cwidth, cheight, data) {

    document.getElementById(tagName).setAttribute('width', cwidth+2);
    document.getElementById(tagName).setAttribute('height', cheight+2);  
    var canvas = new fabric.Canvas(tagName);
    var chart = new fabric.southIndianChart({
        top: 0,
        left: 0,
        width: cwidth,
        height: cheight,
        fill: 'white',
        stroke: 'black',
        fontsize: 15,
        planetInfo: data,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true
      });
    canvas.add(chart);
    canvas.renderAll();
    return canvas;
}

fabric.southIndianChart = fabric.util.createClass(fabric.Rect, {

    type: 'southIndianChart',
    initialize: function (options) {
        this.options = options || {};
        this.stroke = options.stroke || 'black';
        this.fill = options.fill || 'white';
        this.fontsize = options.fontsize || 14;
        this.planetInfo = options.planetInfo || [];
        this.houseData = [];
        this.callSuper('initialize', options);
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {Boolean} noTransform
     */
    _render: function (ctx, noTransform) {

        // optimize 1x1 case (used in spray brush)
        if (this.width === 1 && this.height === 1) {
            ctx.fillRect(-0.5, -0.5, 1, 1);
            return;
        }

        var rx = this.rx ? Math.min(this.rx, this.width / 2) : 0,
            ry = this.ry ? Math.min(this.ry, this.height / 2) : 0,
            w = this.width,
            h = this.height,
            x = noTransform ? this.left : -this.width / 2,
            y = noTransform ? this.top : -this.height / 2,
            isRounded = rx !== 0 || ry !== 0,
            /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */
            k = 1 - 0.5522847498,
            qwidth = w / 4,
            qheight = h / 4;
        ctx.beginPath();

        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + w - rx, y);
        ctx.lineTo(x + w, y + h - ry);
        ctx.lineTo(x + rx, y + h);
        ctx.lineTo(x, y + ry);

        for (var i = 1, j = 4; i < 4; i++, j--) {
            ctx.moveTo(x + i * qwidth, y);
            ctx.lineTo(x + i * qwidth, y + qheight);

            ctx.moveTo(x + i * qwidth, y + (j + i) * qheight);
            ctx.lineTo(x + i * qwidth, qheight);

        }

        ctx.moveTo(x + rx, y + 1 * qheight);
        ctx.lineTo(x + w - rx, y + 1 * qheight);

        ctx.moveTo(x + rx, y + 2 * qheight);
        ctx.lineTo(x + w - rx - 3 * qwidth, y + 2 * qheight);

        ctx.moveTo(x + w - rx - 1 * qwidth, y + 2 * qheight);
        ctx.lineTo(x + w - rx, y + 2 * qheight);

        ctx.moveTo(x + rx, y + 3 * qheight);
        ctx.lineTo(x + w - rx, y + 3 * qheight);

        ctx.moveTo(x + 1 * qwidth, y);
        ctx.lineTo(x + 1 * qwidth, y + 4 * qheight);

        ctx.moveTo(x + 3 * qwidth, y);
        ctx.lineTo(x + 3 * qwidth, y + 4 * qheight);

        ctx.closePath();

        this._renderFill(ctx);
        this._renderStroke(ctx);

        ctx.font=this.fontsize+"px Arial";;
        ctx.fillStyle = 'blue';
        ctx.fillText('1', 5 + x + 1 * qwidth, y + 10);

       
        this.planetInfo.forEach(function (planet) {
            this._renderPlanetInfo(ctx, planet, x, y, qwidth, qheight);
        }, this);
    },

    /**
     * Draws the planets info in the chart
     */
    _renderPlanetInfo: function (ctx, planet, x, y, qwidth, qheight) {
        switch (planet.rasi) {
            case 1:
                this.houseData[1] = this.houseData[1] == null ? 1 : this.houseData[1] + 1;
                ctx.fillText(planet.planet, 5 + x + qwidth, y + 10 + this.houseData[1] * this.fontsize);
                break;
            case 2:
                this.houseData[2] = this.houseData[2] == null ? 1 : this.houseData[2] + 1;
                ctx.fillText(planet.planet, 5 + x + 2 * qwidth, y + 10 + this.houseData[2] * this.fontsize);
                break;
            case 3:
                this.houseData[3] = this.houseData[3] == null ? 1 : this.houseData[3] + 1;
                ctx.fillText(planet.planet, 5 + x + 3 * qwidth, y + 10 + this.houseData[3] * this.fontsize);
                break;
            case 4:
                this.houseData[4] = this.houseData[4] == null ? 1 : this.houseData[4] + 1;
                ctx.fillText(planet.planet, 5 + x + 3 * qwidth, y + 10 + qheight + this.houseData[4] * this.fontsize);
                break;
            case 5:
                this.houseData[5] = this.houseData[5] == null ? 1 : this.houseData[5] + 1;
                ctx.fillText(planet.planet, 5 + x + 3 * qwidth, y + 10 + 2 * qheight + this.houseData[5] * this.fontsize);
                break;
            case 6:
                this.houseData[6] = this.houseData[6] == null ? 1 : this.houseData[6] + 1;
                ctx.fillText(planet.planet, 5 + x + 3 * qwidth, y + 10 + 3 * qheight + this.houseData[6] * this.fontsize);
                break;
            case 7:
                this.houseData[7] = this.houseData[7] == null ? 1 : this.houseData[7] + 1;
                ctx.fillText(planet.planet, 5 + x + 2 * qwidth, y + 10 + 3 * qheight + this.houseData[7] * this.fontsize);
                break;
            case 8:
                this.houseData[8] = this.houseData[8] == null ? 1 : this.houseData[8] + 1;
                ctx.fillText(planet.planet, 5 + x + qwidth, y + 10 + 3 * qheight + this.houseData[8] * this.fontsize);
                break;
            case 9:
                this.houseData[9] = this.houseData[9] == null ? 1 : this.houseData[9] + 1;
                ctx.fillText(planet.planet, 5 + x, y + 10 + 3 * qheight + this.houseData[9] * this.fontsize);
                break;
            case 10:
                this.houseData[10] = this.houseData[10] == null ? 1 : this.houseData[10] + 1;
                ctx.fillText(planet.planet, 5 + x, y + 10 + 2 * qheight + this.houseData[10] * this.fontsize);
                break;
            case 11:
                this.houseData[11] = this.houseData[11] == null ? 1 : this.houseData[11] + 1;
                ctx.fillText(planet.planet, 5 + x, y + 10 + qheight + this.houseData[11] * this.fontsize);
                break;
            case 12:
                this.houseData[12] = this.houseData[12] == null ? 1 : this.houseData[12] + 1;
                ctx.fillText(planet.planet, 5 + x, y + 10 + this.houseData[12] * this.fontsize);
                break;
        }
    }

})
