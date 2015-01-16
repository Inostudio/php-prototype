<?php

class AssertTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testAssert()
	{
		$theTruth = true;
                $this->assertFalse($theTruth);
	}

}