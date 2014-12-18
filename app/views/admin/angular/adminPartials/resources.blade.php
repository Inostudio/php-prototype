<style>
    .cropArea {
      background: #E4E4E4;
      overflow: hidden;
      width:500px;
      height:350px;
    }
</style>

<div>
    <form ng-submit="add(resource)">
        <input type="text" ng-model="resource.title" />
        <br/>

        <div>Select an image file: <input type="file" id="fileInput"/></div>
        <!--
        <div class="cropArea">
            <img-crop image="myImage" result-image="myCroppedImage"></img-crop>
        </div>
        <div>Cropped Image:</div>
        <div>
            <img ng-src="{{myCroppedImage}}" />
        </div>
        -->
        <input type="submit" />
    </form>

    <br/>

    <form ng-submit="saveEdit(editRes)">
        <input type="hidden" ng-model="editRes.id" />
        <input type="text" ng-model="editRes.title" />
        <input type="submit" />
    </form>

    <table class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Path</th>
                <th>View</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="res in resources">
                <th>{{res.title}}</th>
                <th>{{'resources/pics/'+ res.title + '.jpg'}}</th>
                <th><img src="{{res.url}}" style="max-height: 200px; max-width: 200px"/></th>
                <th>
                    <button class="btn" ng-click="delete(res.id)">Delete</button>
                    <button class="btn" ng-click="edit(res.id)">Edit</button>
                </th>
            </tr>
        </tbody>
    </table>
</div>