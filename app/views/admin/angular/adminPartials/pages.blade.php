<form novalidate>
    Title: <input type="text" ng-model="page.title" />
    Body: <input type="text" ng-model="page.body" />
    Status: <input type="text" ng-model="page.title" />
    <dropdown dropdown-model="selected" dropdown-placeholder="-- Select --">
        <dropdown-group>
            <dropdown-item>Draw</dropdown-item>
            <dropdown-item>Private</dropdown-item>
            <dropdown-item>Public</dropdown-item>
        </dropdown-group>
    </dropdown>

</form>

<!--
<div ng-repeat="page in pages">
    <span>{{page.id}}</span>
    <p>{{page.title}}</p>
    <p>{{page.status_id}}</p>
    <p>{{page.body}}</p>
</div>
-->