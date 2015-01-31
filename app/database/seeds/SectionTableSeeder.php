<?php

class SectionTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('sections')->delete();

        Section::create([
            'title' => 'articles',
        ]);
        
        Section::create([
            'title' => 'profile',
        ]);
        
        Section::create([
            'title' => 'auth',
        ]);   
    }    
}