# astro_charts_js
Javascript library for drawing hindu astrological charts.

## Preview
![alt text](https://raw.githubusercontent.com/bbbalabhaskar/astro_charts_js/master/chart.png)

## Usage

* impport JS file along with [fabric.js](https://github.com/kangax/fabric.js/) library
```
<script src="fabric.js" charset="utf-8"></script>
<script src="astro_extn.js" charset="utf-8"></script>
```
* In HTML create canvas element, and call creareChart function 
```
 <canvas id="canvas-body"></canvas>
 <script>
 var chart = createChart(element_id, canvasWidth, canvasHeight, data);
 </script>
```

## Data Format
Data is array of 9 objects where each object has planet, rasi(rasi in which planet lies), and padam(padam in rasi 1 to 8) info
```
 [
   {
      'planet': 'సూర్యుడు',
      'rasi': 7,
      'padam': 1
    },
   ...8 more
 ]
 ```
