<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserModel extends CI_Model {
    public function addUser( $user ) {
        $this->db->insert( 'users', $user );
    }

    public function login( $email, $password ) {
    	$this->db->where( 'email', $email );
    	$query = $this->db->get( 'users' );
    	$queryResult = $query->row();

        $output = array();

    	if( empty( $queryResult ) || $password != $queryResult->password ) {
            $output[ 'success' ] = false;
    		$output[ 'error' ] = "nieprawidłowy adres e-mail bądź hasło";
    	} else {
            $output[ 'success' ] = true;
    		$output[ 'user' ] = $queryResult;
    	}	

    	return $output;
    }
}