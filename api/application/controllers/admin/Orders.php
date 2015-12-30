<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Orders extends CI_Controller {
    private $tokenPayload;

    public function __construct() {       
        parent::__construct();

        $this->load->model( 'admin/OrdersModel' );

        $post = file_get_contents( 'php://input' );
        $_POST = json_decode( $post , true );

        $token = $this->input->post( 'token' );
        $this->tokenPayload = $this->jwt->decode( $token , config_item( 'encryption_key' ) );
    }

    public function getOrders() {
        $output = $this->OrdersModel->getOrders();
        echo json_encode( $output );
    }

    public function changeStatus() {
        $orderId = $this->input->post( 'orderId' );
        $status = $this->input->post( 'status' );

        $this->OrdersModel->changeStatus( $orderId, $status );
    } 

    public function deleteOrder() {
        $orderId = $this->input->post( 'orderId' );

        $this->OrdersModel->deleteOrder( $orderId );
    }
}