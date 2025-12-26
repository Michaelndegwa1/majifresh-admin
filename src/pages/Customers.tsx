import { useEffect, useState } from 'react';
import { usersApi } from '../api/users';
import { Customer } from '../types/user';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Users } from 'lucide-react';

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await usersApi.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Customers</h1>
        <p className="text-slate-500">Manage your customer base</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">Total Customers</p>
                <p className="text-slate-900">{customers.length}</p>
              </div>
              <Users className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Total Orders</p>
            <p className="text-slate-900">
              {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Total Revenue</p>
            <p className="text-slate-900">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-slate-500">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No customers found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Member Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <p className="text-slate-900">{customer.name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-600">{customer.email}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-600">{customer.phone}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-900">{customer.totalOrders}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-900">${customer.totalSpent.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-600">
                        {customer.lastOrderAt
                          ? new Date(customer.lastOrderAt).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-600">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
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
