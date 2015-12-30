<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Orders extends CI_Controller {
    private $tokenPayload;

    public function __construct() {       
        parent::__construct();

        $this->load->model( 'site/OrdersModel' );

        $post = file_get_contents( 'php://input' );
        $_POST = json_decode( $post , true );

        $token = $this->input->post( 'token' );
        $this->tokenPayload = $this->jwt->decode( $token , config_item( 'encryption_key' ) );
    }

    public function getOrders() {
        $output = $this->OrdersModel->getOrders( $this->tokenPayload->userId );
        echo json_encode( $output );
    }

    public function saveOrder() {
        $cart = $this->input->post( 'cart' );
        $total = $this->input->post( 'total' ); 

        $order = array(
            'userId' => $this->tokenPayload->userId,
            'name' => $this->tokenPayload->name,
            'email' => $this->tokenPayload->email,
            'total' => $total,
            'status' => 0
        );  

        $this->OrdersModel->saveOrder( $order, $cart );
    }
}