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
        $this->localAdapter = new LocalAdapter('public');
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
                $res->url = '/' . $this->path . $fileName;
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
    public function delete($id)
    {
        $result = [false, 'Unknown'];

        $resource = Resource::find($id);
        if($resource) {
            $resource = $resource->first();

            $file = new File($resource->url, $this->filesystem);
            $file->delete();
            $result = [$resource->delete()];
        } else {
            $result[1] = 'Resource didn\'t found';
        }

        return $result;
    }
} 