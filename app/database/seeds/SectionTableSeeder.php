<?php

class SectionTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('sections')->delete();

        Section::create([
            'title' => 'Articles',
        ]);
        
        Section::create([
            'title' => 'Profile',
        ]);
        
        Section::create([
            'title' => 'Sign up',
        ]);
        
        Section::create([
            'title' => 'Sign in',
        ]);    
    }    
}