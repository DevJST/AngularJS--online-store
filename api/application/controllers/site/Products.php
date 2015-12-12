<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {
    public function __construct() {       
        parent::__construct();
        
        //$post = file_get_contents( 'php://input' );
        //$_POST = json_decode( $post , true );

        $this->load->model( 'site/ProductsModel' );
    }

    public function getProducts() {
        $output = $this->ProductsModel->getProducts();
        echo json_encode( $output );
    }

    public function getProduct( $id ) {
    	$output = $this->ProductsModel->getProduct( $id );
        echo json_encode( $output );
    }
}