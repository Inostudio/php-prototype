<?php namespace Admin;

use \Input;
use \Response;

class LanguageController extends \BaseController {
    
    public function getLanguageFiles(){
        $fullPathEn = app_path().'/lang/en'.Input::get('path');
        $content = [];
        $fileEn = [];
        $fileRu = [];
        if (is_dir($fullPathEn)) {
            $fp=opendir($fullPathEn);
            while($cv_content=readdir($fp)) {
                if(($cv_content != '.') && ($cv_content != '..')){
                    $content[]=$cv_content;
                }
            }
            closedir($fp);
        } else if(is_file($fullPathEn)){
            $fullPathRu = app_path().'/lang/ru'.Input::get('path'); 
            $fileEn = require($fullPathEn);
            $fileRu = require($fullPathRu);
        }
        return Response::json([$content, [$fileEn, $fileRu]]);
    }

    public function postEditLanguageFile(){
        if(trim(Input::get('value')) == ''){
            return Response::json([false, 'Field is required!']);
        }
        $languageContent = require(app_path().'/lang'.'/'.Input::get('language').Input::get('path').'/'.Input::get('file'));
        $languageContent[Input::get('key')] = Input::get('value');
       
        $bufName = md5(Input::get('file'));
        $f = fopen(app_path().'/lang'.'/'.Input::get('language').Input::get('path').'/'.$bufName, "w");
        fwrite($f, "<?php\r\n");
        fwrite($f, "return array(\r\n");
        foreach ($languageContent as $key => $value) {
           if(!fwrite($f, ("    '".$key."'  =>  "."'".$value."',\r\n"))){
               fclose($f);
               unlink(app_path().'/lang'.'/'.Input::get('language').Input::get('path').'/'.$bufName);
               return Response::json([false, 'Error writing file!']);
           } 
        }
        fwrite($f, ");");
        fclose($f);
        unlink(app_path().'/lang'.'/'.Input::get('language').Input::get('path').'/'.Input::get('file'));
        rename(app_path().'/lang'.'/'.Input::get('language').Input::get('path').'/'.$bufName, app_path().'/lang'.'/'.Input::get('language').Input::get('path').'/'.Input::get('file'));
        return Response::json([true, $languageContent]);
    }
    
    public function postTableTranslate(){
        $lang = \Config::get('app.locale');
        $tablePhrase = require(app_path().'/lang/'.$lang.'/admin/tables.php');
        $outputArr = [];
        
        foreach(Input::get('phrase') as $phrase){
            $outputArr[$phrase] = $tablePhrase[$phrase];
        }
        return Response::json([$outputArr]);
    }
}