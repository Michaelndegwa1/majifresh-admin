import { useEffect, useState } from 'react';
import { usersApi } from '../api/users';
import { Driver } from '../types/user';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Truck, Star } from 'lucide-react';

export function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const data = await usersApi.getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'secondary' => {
    if (status === 'available') return 'success';
    if (status === 'busy') return 'warning';
    return 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Drivers</h1>
        <p className="text-slate-500">Manage your delivery fleet</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">Total Drivers</p>
                <p className="text-slate-900">{drivers.length}</p>
              </div>
              <Truck className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">Available</p>
            <p className="text-slate-900">
              {drivers.filter((d) => d.status === 'available').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-500">On Delivery</p>
            <p className="text-slate-900">
              {drivers.filter((d) => d.status === 'busy').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-slate-500">Loading drivers...</div>
          ) : drivers.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No drivers found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deliveries</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <p className="text-slate-900">{driver.name}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-600">{driver.email}</p>
                        <p className="text-slate-500">{driver.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-900">{driver.vehicle.type}</p>
                        <p className="text-slate-500 font-mono">{driver.vehicle.plateNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(driver.status)}>
                        {driver.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-900">{driver.completedDeliveries}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-slate-900">{driver.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-600">
                        {new Date(driver.createdAt).toLocaleDateString()}
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
