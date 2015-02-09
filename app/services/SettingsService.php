<?php

class SettingsService
{
    protected $ss = null;
    
    public function changeSection($id, $disable){
        $section = Section::find($id);
        $section->disable = $disable;
        $section->save();
        return true;
    }
}

