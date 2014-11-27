<style>
.cropArea {
    background: #E4E4E4;
    overflow: hidden;
    width: 500px;
    height: 350px;
}
</style>


<button class="btn btn-default" ng-click="open('lg')">Small modal</button>

<script type="text/ng-template" id="myModalContent.html">
        <div style="display: inline-block; background: #efefef; width: 100%;" ng-style="">
            <div class="modal-header">
                <h3 class="modal-title">Choose a miniature</h3>
            </div>
            <div class="modal-body" style="height: 600px;border: dashed 3px #c5cacd; margin: 15px; background: #fff">
                <div>
                    <div ng-hide="uploaded">
                        Select an image file:
                        <input type="file" ng-model="fileInput" id="fileInput" ng-click="Init()" />
                    </div>
                    <section ng-hide="!uploaded">
                        <div class="cropArea small" ng-style="ImageStyle" style="float: left; margin: 40px">
                            <img-crop image="myImage" result-image="myCroppedImage"></img-crop>
                        </div>
                        <div style="margin: 40px">
                            <div>Cropped Image:</div>
                            <div ><img ng-src="{{myCroppedImage}}" /></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <div class="modal-footer" ng-hide="!uploaded">
            <button class="btn btn-primary" ng-click="upload()">Upload</button>
            <button class="btn btn-primary" ng-click="ok()">OK</button>
            <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
        </div>
    </script>