<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OrdersModel extends CI_Model {
    public function getOrders() {
    	$query = $this->db->query( "SELECT orders.orderId, orders.name AS orderName, orders.email, orders.total, orders.status, order_products.name AS productName, order_products.price, order_products.weight, order_products.quantity FROM orders, order_products WHERE orders.orderId = order_products.orderId ORDER BY orderId;" );
        
        $orders = array();

        $orderId = null;
        $i = -1; $j = 0;

        foreach ( $query->result() as $row ) {
            if ( $orderId !== $row->orderId || $orderId === null ) {
                $i++; $j = 0;
                $orderId = $row->orderId;

                $orders[ $i ][ 'orderId' ] = $row->orderId;
                $orders[ $i ][ 'name' ] = $row->orderName;
                $orders[ $i ][ 'email' ] = $row->email;
                $orders[ $i ][ 'total' ] = $row->total;
                $orders[ $i ][ 'status' ] = $row->status;
                $orders[ $i ][ 'cart' ] = array( 
                    array (
                        'name' => $row->productName,
                        'price' => $row->price,
                        'weight' => $row->weight,
                        'quantity' => $row->quantity,
                    )
                );
            } else {
                $j++;

                $orders[ $i ][ 'cart' ][ $j ] = array (
                    'name' => $row->productName,
                    'price' => $row->price,
                    'weight' => $row->weight,
                    'quantity' => $row->quantity,
                );
            }     
        }

        return $orders;
    }

    public function changeStatus( $orderId, $status ) {
        $query = "UPDATE orders SET status=$status WHERE orderId=$orderId";
        $this->db->query( $query );

        echo $query;
    } 

    public function deleteOrder( $orderId ) {
        $this->db->where( 'orderId', $orderId );
        $this->db->delete( 'order_products' );

        $this->db->where( 'orderId', $orderId );
        $this->db->delete( 'orders' );
    }
}