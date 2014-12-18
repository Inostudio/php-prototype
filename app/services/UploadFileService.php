<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 17.12.2014
 * Time: 20:05
 */

use Gaufrette\File;
use Gaufrette\Filesystem;
use Gaufrette\Adapter\Local as LocalAdapter;

class UploadFileService {

    protected $decoderService = null;


    public function __construct(DecoderService $ds) {
        $this->decoderService = $ds;
    }

    public function uploadImage($data, $name, $path, $format = null)
    {
        if($format !== null) {
            $data = $this->decoderService->decodeImage($data, $format);
        }

        $localAdapter = new LocalAdapter($path, true);
        $filesystem = new Filesystem($localAdapter);

        $file = new File($name, $filesystem);
        $file->setContent($data);

        return $file->exists();
    }
} 