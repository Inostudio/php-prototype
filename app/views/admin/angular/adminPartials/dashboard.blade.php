<?php
    $lang =  App::getLocale();
?>
<div data-ng-init="vm.lang = '<% $lang %>'"></div>
<div id="chart2" ac-chart="vm.chartType2" ac-data="vm.data2" ac-config="vm.config2"></div>
<div id="chart1" ac-chart="vm.chartType" ac-data="vm.data1" ac-config="vm.config1"></div>