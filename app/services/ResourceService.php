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

class ResourceService {

    protected $localAdapter;//new LocalAdapter('public/resources/pics');
    protected $filesystem;// = new Filesystem($localAdapter);

    protected $path = 'public/resources/pics/';
    protected $url = '/resources/pics/';

    protected $us = null;

    public function __construct(UploadFileService $uploadService)
    {
        $this->us = $uploadService;
        $this->localAdapter = new LocalAdapter('public/resources/pics');
        $this->filesystem = new Filesystem($this->localAdapter);
    }

    public function add($title, $file)
    {
        $response = false;

        $fileName = $title . '.jpg';
        if ($this->us->uploadImage($file, $fileName, $this->path, 'jpeg')) {
            $res = new Resource;
            $res->title = $title;
            $res->url = $this->url . $fileName;
            $res->path = $this->path . $fileName;
            $res->save();

            $response = true;
        }
        return $response ? $res : null;
    }

    public function delete($id)
    {
        $result = false;
        $resource = Resource::find($id);
        if($resource) {
            $resource = $resource->first();


            $file = new File($resource->title.'.jpg', $this->filesystem);
            $file->delete();
            $result = $resource->delete();
        }


        return $result;
    }

    public function edit($id, $title)
    {
        $result = false;

        $resource = Resource::find($id);
        if($resource) {
            $resource = $resource->first();
            $resource->title = $title;

            $file = new File($resource->title.'.jpg', $this->filesystem);
            return $file->setName($title.'.jpg');


            $resource->save();


            $result = true;
        }

        return $result;
    }
} 