import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../../api/orders';
import { Order, OrderStatus } from '../../types/order';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Eye, RefreshCw } from 'lucide-react';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await ordersApi.getAll({
        status: statusFilter || undefined,
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Orders</h1>
          <p className="text-slate-500">Manage and track all customer orders</p>
        </div>
        <Button onClick={fetchOrders} variant="outline">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="assigned">Assigned</option>
              <option value="delivering">Delivering</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Total Orders</p>
            <p className="text-slate-900">{orders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Pending</p>
            <p className="text-slate-900">
              {orders.filter((o) => o.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Delivering</p>
            <p className="text-slate-900">
              {orders.filter((o) => o.status === 'delivering').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Delivered</p>
            <p className="text-slate-900">
              {orders.filter((o) => o.status === 'delivered').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-slate-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No orders found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span className="font-mono text-slate-900">{order.orderNumber}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-900">{order.customer.name}</p>
                        <p className="text-slate-500">{order.customer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-600">{order.items.length} items</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-900">${order.totalAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.driver ? (
                        <div>
                          <p className="text-slate-900">{order.driver.name}</p>
                          <p className="text-slate-500">{order.driver.phone}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
