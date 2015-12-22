<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OrdersModel extends CI_Model {
  /*  public function getOrders() {
    	$query = $this->db->get( 'orders' );
        $queryResult = $query->result();

        return $queryResult;
    } */

    public function saveOrder( $order, $cart ) {
    	$this->db->insert( 'orders', $order );
        $insert_id = $this->db->insert_id();

        foreach ( $cart as &$value ) {
            $value[ 'orderId' ] = $insert_id;
            $this->db->insert( 'order_products', $value );
        }
    }
}