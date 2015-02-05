<style type="text/css">
    [ac-chart] {
            float:left;
            width: 48%;
            height: 400px;
            margin: 0 1%;
    }
    .ac-tooltip {
        color: black;
        border: 2px solid rgba(200,200,0,0.8);
        background-color: rgba(200,200,0,0.5);
    }

    #chart1 .ac-legend-box, #chart2 .ac-legend-box {
        border-radius: 10px;
    }
    
    #chart1, #chart2 {
        height: 400px;
        width: 800px;
    }
</style>
<h1 class="page-header"><%trans('admin/dashboard.statistics')%></h1>
<div id="chart2" ac-chart="vm.chartType2" ac-data="vm.data2" ac-config="vm.config2"></div>
<div id="chart1" ac-chart="vm.chartType" ac-data="vm.data1" ac-config="vm.config1"></div>