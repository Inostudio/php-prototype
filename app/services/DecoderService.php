<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 17.12.2014
 * Time: 20:18
 */

class DecoderService {

    /**
     * Decode image from base64
     *
     * @param string $img
     * @param string $format
     *
     * @return string
     */
    public function decodeImage($img, $format)
    {
        $img = str_replace('data:image/'. $format . ';base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        return base64_decode($img);
    }
} 