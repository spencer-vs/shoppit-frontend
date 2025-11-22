import OrderHistoryItem from "./OrderHistoryItem"

const OrderHistoryItemContainer = ({ orderItems }) => {
  if (!orderItems || orderItems.length === 0) {
    return <div className="alert alert-info m-3">No orders found.</div>;
  }
  return (
    <div className="row" style={{ height: '300px', overflow: 'auto' }}>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
            <h5>Order History</h5>
          </div>
          {orderItems.map(item => (
            <OrderHistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer