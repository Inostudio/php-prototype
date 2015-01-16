<?php

class ArrayTest extends TestCase {

    public function testArrayTest(){
        $fixture = array();

        $this->assertTrue(count($fixture) == 0);

        $fixture[] = 'element';

    }

    function assertTrue($condition){
        if(!$condition){
            throw new Exception('Asserion failed!');
        }
    }
}
