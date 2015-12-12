<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsersModel extends CI_Model {
    public function getUsers() {
    	$query = $this->db->get( 'users' );
        $queryResult = $query->result();

        return $queryResult;
    }

    public function getUser( $id ) { 
    	$this->db->select( array( 'userId', 'name', 'email', 'role' ) );
        $this->db->where( 'userId', $id );
    	$query = $this->db->get( 'users' );
    	$queryResult = $query->row();

    	return $queryResult;
    }

    public function updateUser( $user ) {
        $this->db->where( 'userId', $user['userId'] );
        $this->db->update( 'users', $user );
    }

    public function createUser( $user ) {
        $this->db->insert( 'users', $user );
    }

    public function deleteUser( $userId ) {
        $this->db->where( 'userId', $userId );
        $this->db->delete( 'users' );
    }

    public function getUnique( $id, $email ) {
        $this->db->where( 'email' , $email );
        $this->db->where( 'userId !=' , $id );
        $query = $this->db->get( 'users' );
        $queryResult = $query->row();

        return $queryResult;
    }
}