<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 17.12.2014
 * Time: 19:03
 */

use Gaufrette\File;
use Gaufrette\Filesystem;
use Gaufrette\Adapter\Local as LocalAdapter;

/**
 * Class ResourceService
 */
class ResourceService {

    /**
     * @var LocalAdapter
     */
    protected $localAdapter;//new LocalAdapter('public/resources/pics');
    /**
     * @var Filesystem
     */
    protected $filesystem;// = new Filesystem($localAdapter);

    /**
     * @var string
     */
    protected $path = 'public/resources/pics/';
    /**
     * @var string
     */
    protected $url = '/resources/pics/';

    /**
     * @var null|UploadFileService
     */
    protected $us = null;

    /**
     * @param UploadFileService $uploadService
     */
    public function __construct(UploadFileService $uploadService)
    {
        $this->us = $uploadService;
        $this->localAdapter = new LocalAdapter(public_path());
        $this->filesystem = new Filesystem($this->localAdapter);
    }

    /**
     * @param $title
     * @param $file
     * @return array
     */
    public function add($title, $file)
    {
        $result = [false, 'Unknown'];

        if(!(Resource::where('title', '=', $title)->first())) {
            $fileName = substr(md5($title), 9, 19) . '.jpg';
            if ($this->us->uploadImage($file, $fileName, $this->path, 'jpeg')) {
                $res = new Resource;
                $res->title = $title;
                $res->url = '/public' . $this->url . $fileName;
                $res->path = $this->path . $fileName;
                $result = [$res->save(), $res];
            }
        } else {
            $result[1] = 'This resource is exist';
        }

        return $result;
    }

    /**
     * @param $id
     * @return array
     */

    public function delete($id, $action, $direction, $offset, $limit, $phrase, $src){
        $result = [false, 'Unknown', []];   //$result = [false, 'Unknown'];
        $resource = Resource::find($id);
        $notFound = false;
        if($resource) {

            $resource = Resource::where('id', '=', $id)->delete();

            //$file = new File($resource->url, $this->filesystem);    //Расцитировать при работе с реальными ресурсами!!!
            //$file->delete();
            $result[0] = true;

        } else {
            $notFound = true;
        }

        //$notFound = true;
        if($notFound) {
            $result[1] = trans('admin/resources.message_resource_not_found');
        }
        if($result[0]){
            if(!$action){   //Обычная подгрузка
                $result[2] = $this->getResources($direction, 1, ($offset + $limit - 1));
            } else {    //Подгрузка при поиске
                $result[2] = $this->getSearchResources($direction, $phrase, $src, 1, ($offset + $limit - 1));
            }
        }
        return $result;
    }
    
    public function getResources($direction, $limit, $offset){
        $resource = Resource::orderBy('title', $direction)
                ->skip($offset)
                ->take($limit)
                ->get();
        $resourceCount = Resource::count();
         return [$resource, $resourceCount];
    }
    
    public function editResource($id, $title){
        $resource = Resource::find($id);
        $resource->title = $title;
        $resource->save();
        return;
    }
    
    public function getSearchResources($direction, $phrase, $src, $limit, $offset){
        $resources = [];
        $resourcesCount = 0;
        if($src == 1){  //Поиск по названию
            $resources = Resource::where('title', 'like', '%'.$phrase.'%');
            $resourcesCount = $resources->count();
            $resources = $resources->orderBy('title', $direction)
                ->skip($offset)
                ->take($limit)
                ->get();
        } else {    //По url-у
            $resources = Resource::where('url', 'like', '%'.$phrase.'%');
            $resourcesCount = $resources->count();
            $resources = $resources->orderBy('title', $direction)
                ->skip($offset)
                ->take($limit)
                ->get();
        }
        
        return [$resources, $resourcesCount];
    }
}