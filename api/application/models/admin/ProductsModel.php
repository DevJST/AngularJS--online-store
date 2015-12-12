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

    public function updateProduct( $product ) {
        $this->db->where( 'productId', $product['productId'] );
        $this->db->update( 'products', $product );
    }

    public function createProduct( $product ) {
        $this->db->insert( 'products', $product );
    }

    public function deleteProduct( $productId ) {

        $this->db->where( 'productId', $productId );
        $this->db->delete( 'products' );
    }
}