import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ordersApi } from '../../api/orders';
import { usersApi } from '../../api/users';
import { Order, OrderStatus } from '../../types/order';
import { Driver } from '../../types/user';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { ArrowLeft, MapPin, User, Phone, Package } from 'lucide-react';

export function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (orderId: string) => {
    setLoading(true);
    try {
      const [orderData, driversData] = await Promise.all([
        ordersApi.getById(orderId),
        usersApi.getDrivers(),
      ]);
      setOrder(orderData);
      setDrivers(driversData);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (!order) return;

    setUpdating(true);
    try {
      const updatedOrder = await ordersApi.updateStatus({
        orderId: order.id,
        status: newStatus,
      });
      setOrder(updatedOrder);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignDriver = async (driverId: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      const updatedOrder = await ordersApi.assignDriver({
        orderId: order.id,
        driverId,
      });
      setOrder(updatedOrder);
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Failed to assign driver');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Order not found</div>
      </div>
    );
  }

  const getStatusVariant = (status: OrderStatus) => {
    const variants: Record<OrderStatus, 'success' | 'warning' | 'default' | 'destructive' | 'secondary'> = {
      delivered: 'success',
      delivering: 'default',
      assigned: 'default',
      preparing: 'secondary',
      confirmed: 'secondary',
      pending: 'warning',
      cancelled: 'destructive',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-slate-900">Order {order.orderNumber}</h1>
          <p className="text-slate-500">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <Badge variant={getStatusVariant(order.status)}>
          {order.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-slate-900">{item.productName}</p>
                      <p className="text-slate-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-slate-900">${item.subtotal.toFixed(2)}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <p className="text-slate-900">Total</p>
                  <p className="text-slate-900">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="text-slate-900">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="text-slate-900">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="text-slate-900">{order.customer.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-900">{order.deliveryAddress.street}</p>
              <p className="text-slate-600">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Order Management */}
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(e.target.value as OrderStatus)}
                  disabled={updating}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="assigned">Assigned</option>
                  <option value="delivering">Delivering</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assign Driver</Label>
                <Select
                  value={order.driver?.id || ''}
                  onChange={(e) => handleAssignDriver(e.target.value)}
                  disabled={updating}
                >
                  <option value="">Select a driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.status}
                    </option>
                  ))}
                </Select>
              </div>

              {order.driver && (
                <div className="rounded-lg bg-sky-50 p-3">
                  <p className="text-sky-900">Current Driver</p>
                  <p className="text-sky-700">{order.driver.name}</p>
                  <p className="flex items-center gap-1 text-sky-700">
                    <Phone className="h-3 w-3" />
                    {order.driver.phone}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
