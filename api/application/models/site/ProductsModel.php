<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductsModel extends CI_Model {
    public function getProducts() {
    	$query = $this->db->get( 'products' );
        $queryResult = $query->result();

        return $queryResult;
    }

    public function getProduct( $id ) {
    	$this->db->where( 'productId', $id );
    	$query = $this->db->get( 'products' );
    	$queryResult = $query->row();

    	return $queryResult;
    }
}