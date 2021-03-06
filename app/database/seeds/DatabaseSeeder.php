<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UserTableSeeder');
                $this->call('UserProfileTableSeeder');
                $this->call('UserToGroupTableSeeder');
                $this->call('GroupTableSeeder');
                $this->call('ArticleTableSeeder');
                $this->call('CategoryTableSeeder');
                $this->call('StatusTableSeeder');
                $this->call('PageTableSeeder');
                $this->call('CategoryTableSeeder');
                $this->call('ResourceTableSeeder');
                $this->call('SectionTableSeeder');
	}

}
