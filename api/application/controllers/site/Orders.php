<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Orders extends CI_Controller {
    public function __construct() {       
        parent::__construct();

        $this->load->model( 'site/OrdersModel' );
    }

    public function getOrders() {
        $output = $this->OrdersModel->getOrders();
        echo json_encode( $output );
    }

    public function getOrder( $id ) {
    	$output = $this->OrdersModel->getOrder( $id );
        echo json_encode( $output );
    }

    public function saveOrder() {
        $post = file_get_contents( 'php://input' );
        $_POST = json_decode( $post , true );

        $token = $this->input->post( 'token' );
        $tokenPayload = $this->jwt->decode( $token , config_item( 'encryption_key' ) );

        $cart = $this->input->post( 'cart' );
        $total = $this->input->post( 'total' ); 

        $order = array(
            'userId' => $tokenPayload->userId,
            'name' => $tokenPayload->name,
            'email' => $tokenPayload->email,
            'total' => $total,
            'status' => 0
        );  

        $this->OrdersModel->saveOrder( $order, $cart );
    }
}