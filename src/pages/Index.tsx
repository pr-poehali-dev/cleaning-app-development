import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type UserRole = 'client' | 'worker' | 'admin' | null;

interface Service {
  id: string;
  title: string;
  price: number;
  icon: string;
  duration: string;
  category: string;
}

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  address: string;
  date: string;
  time: string;
  status: 'new' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  workerName?: string;
  workerId?: string;
  notes?: string;
}

const services: Service[] = [
  { id: '1', title: 'Уборка', price: 1800, icon: 'Sparkles', duration: '2-3 ч', category: 'Дом' },
  { id: '2', title: 'Мойка окон', price: 150, icon: 'Square', duration: '1-2 ч', category: 'Дом' },
  { id: '3', title: 'Химчистка', price: 2500, icon: 'Sofa', duration: '2-3 ч', category: 'Дом' },
  { id: '4', title: 'Генеральная', price: 3500, icon: 'Home', duration: '3-4 ч', category: 'Дом' },
  { id: '5', title: 'После ремонта', price: 5000, icon: 'Hammer', duration: '4-6 ч', category: 'Дом' },
  { id: '6', title: 'Офис', price: 2000, icon: 'Building', duration: '2-3 ч', category: 'Офис' }
];

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      clientName: 'Анна Петрова',
      clientPhone: '+7 999 123-45-67',
      service: 'Уборка',
      address: 'ул. Ленина, 5, кв. 10',
      date: '2024-11-28',
      time: '14:00',
      status: 'accepted',
      price: 1800,
      workerName: 'Мария Иванова',
      workerId: 'w1'
    }
  ]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingAddress, setBookingAddress] = useState('ул. Ленина, 5, кв. 10');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
    setBookingTime('10:00');
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const createOrder = () => {
    if (!selectedService || !bookingAddress || !bookingDate || !bookingTime) {
      showNotification('Заполните все поля');
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      clientName: userName || 'Анна Петрова',
      clientPhone: userPhone || '+7 999 123-45-67',
      service: selectedService.title,
      address: bookingAddress,
      date: bookingDate,
      time: bookingTime,
      status: 'new',
      price: selectedService.price,
      notes: bookingNotes
    };

    setOrders([newOrder, ...orders]);
    setIsBookingOpen(false);
    setSelectedService(null);
    setBookingNotes('');
    showNotification('Заказ создан! Ждем подтверждения исполнителя');
    setActiveTab('orders');
  };

  const acceptOrder = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId 
        ? { ...o, status: 'accepted', workerName: userName || 'Мария Иванова', workerId: 'current' }
        : o
    ));
    showNotification('Заказ принят!');
  };

  const startOrder = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: 'in_progress' } : o
    ));
    showNotification('Заказ начат');
  };

  const completeOrder = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: 'completed' } : o
    ));
    showNotification('Заказ завершен!');
  };

  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    ));
    showNotification('Заказ отменен');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
    showNotification('Заказ удален');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-500',
      accepted: 'bg-yellow-500',
      in_progress: 'bg-green-500',
      completed: 'bg-gray-400',
      cancelled: 'bg-red-500'
    };
    const labels = {
      new: 'Новый',
      accepted: 'Принят',
      in_progress: 'В работе',
      completed: 'Завершен',
      cancelled: 'Отменен'
    };
    return <Badge className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <img 
                src="https://cdn.poehali.dev/files/6f20e5ee-4a27-4425-aded-487ffb89724c.jpg" 
                alt="Клик-Клин" 
                className="h-16 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">Добро пожаловать</h1>
              <p className="text-muted-foreground">Выберите роль для входа</p>
            </div>

            <div className="space-y-4 mb-6">
              <Input 
                placeholder="Ваше имя" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input 
                placeholder="+7 (999) 999-99-99" 
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full h-14 justify-start gap-3 bg-gradient-to-r from-blue-500 to-blue-600"
                onClick={() => {
                  if (!userName) {
                    setUserName('Анна Петрова');
                    setUserPhone('+7 999 123-45-67');
                  }
                  setUserRole('client');
                }}
              >
                <Icon name="User" size={24} />
                <div className="text-left">
                  <div className="font-semibold">Клиент</div>
                  <div className="text-xs opacity-80">Заказать услугу</div>
                </div>
              </Button>

              <Button 
                className="w-full h-14 justify-start gap-3 bg-gradient-to-r from-green-500 to-green-600"
                onClick={() => {
                  if (!userName) {
                    setUserName('Мария Иванова');
                    setUserPhone('+7 999 234-56-78');
                  }
                  setUserRole('worker');
                }}
              >
                <Icon name="Briefcase" size={24} />
                <div className="text-left">
                  <div className="font-semibold">Исполнитель</div>
                  <div className="text-xs opacity-80">Принимать заказы</div>
                </div>
              </Button>

              <Button 
                className="w-full h-14 justify-start gap-3 bg-gradient-to-r from-purple-500 to-purple-600"
                onClick={() => {
                  if (!userName) {
                    setUserName('Администратор');
                    setUserPhone('+7 999 000-00-00');
                  }
                  setUserRole('admin');
                }}
              >
                <Icon name="Shield" size={24} />
                <div className="text-left">
                  <div className="font-semibold">Администратор</div>
                  <div className="text-xs opacity-80">Управление</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        {notification && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-top">
            {notification}
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={28} />
              <div>
                <h1 className="font-bold text-lg">{userName}</h1>
                <p className="text-xs text-purple-100">Администратор</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white"
              onClick={() => {
                setUserRole(null);
                setUserName('');
                setUserPhone('');
              }}
            >
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <Card className="border-0 shadow bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Всего заказов</p>
                  <p className="text-4xl font-bold">{orders.length}</p>
                </div>
                <Icon name="BarChart3" size={48} className="opacity-50" />
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div>
                  <p className="text-purple-100">Активных</p>
                  <p className="font-bold text-xl">{orders.filter(o => o.status === 'new' || o.status === 'accepted' || o.status === 'in_progress').length}</p>
                </div>
                <div>
                  <p className="text-purple-100">Завершено</p>
                  <p className="font-bold text-xl">{orders.filter(o => o.status === 'completed').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Все заказы</h2>
            <Badge variant="secondary">{orders.length}</Badge>
          </div>

          {orders.map((order) => (
            <Card key={order.id} className="border-0 shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {getStatusBadge(order.status)}
                    <p className="font-bold mt-2">{order.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в {order.time}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-purple-600">{order.price} ₽</p>
                </div>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span>{order.clientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span>{order.clientPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span>{order.address}</span>
                  </div>
                  {order.workerName && (
                    <div className="flex items-center gap-2">
                      <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                      <span>{order.workerName}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Отменить
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-red-600"
                    onClick={() => deleteOrder(order.id)}
                  >
                    <Icon name="Trash2" size={16} className="mr-1" />
                    Удалить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Заказов пока нет</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (userRole === 'worker') {
    const newOrders = orders.filter(o => o.status === 'new');
    const myOrders = orders.filter(o => o.workerId === 'current' && (o.status === 'accepted' || o.status === 'in_progress'));
    const completedOrders = orders.filter(o => o.status === 'completed' && o.workerId === 'current');

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {notification && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-top">
            {notification}
          </div>
        )}

        {activeTab === 'home' && (
          <>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-6 rounded-b-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-white">
                    <AvatarFallback className="bg-green-400 text-white font-bold">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-green-100">Исполнитель</p>
                    <p className="font-bold text-lg">{userName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-500 mb-1">⭐ 4.9</Badge>
                  <p className="text-xs text-green-100">{completedOrders.length} заказов</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">{completedOrders.reduce((sum, o) => sum + o.price, 0)} ₽</p>
                  <p className="text-xs text-green-100">Заработано</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">{myOrders.length}</p>
                  <p className="text-xs text-green-100">Активных</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-lg">Новые заказы</h2>
                  <Badge variant="secondary">{newOrders.length}</Badge>
                </div>

                {newOrders.map((order) => (
                  <Card key={order.id} className="border-0 shadow mb-3">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-base">{order.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в {order.time}
                          </p>
                        </div>
                        <p className="font-bold text-xl text-green-600">{order.price} ₽</p>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                          <span>{order.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span>{order.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span>{services.find(s => s.title === order.service)?.duration}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Отклонить
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => acceptOrder(order.id)}
                        >
                          <Icon name="Check" size={16} className="mr-1" />
                          Принять
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {newOrders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Inbox" size={48} className="mx-auto mb-2" />
                    <p>Новых заказов пока нет</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-bold text-lg mb-3">Активные заказы</h2>

                {myOrders.map((order) => (
                  <Card key={order.id} className="border-0 shadow mb-3">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          {getStatusBadge(order.status)}
                          <p className="font-bold text-base mt-2">{order.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в {order.time}
                          </p>
                        </div>
                        <p className="font-bold text-xl text-green-600">{order.price} ₽</p>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                          <span>{order.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Phone" size={16} className="text-muted-foreground" />
                          <span>{order.clientPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span>{order.address}</span>
                        </div>
                      </div>

                      {order.status === 'accepted' && (
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => startOrder(order.id)}
                        >
                          <Icon name="Play" size={16} className="mr-2" />
                          Начать работу
                        </Button>
                      )}

                      {order.status === 'in_progress' && (
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => completeOrder(order.id)}
                        >
                          <Icon name="CheckCircle" size={16} className="mr-2" />
                          Завершить заказ
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {myOrders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Inbox" size={48} className="mx-auto mb-2" />
                    <p>У вас нет активных заказов</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
              <h1 className="font-bold text-xl">История заказов</h1>
            </div>

            <div className="p-4 space-y-3">
              {completedOrders.map((order) => (
                <Card key={order.id} className="border-0 shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {getStatusBadge(order.status)}
                        <p className="font-bold mt-2">{order.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в {order.time}
                        </p>
                      </div>
                      <p className="font-bold text-lg text-green-600">{order.price} ₽</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {completedOrders.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Завершенных заказов пока нет</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-8 rounded-b-3xl">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-white">
                  <AvatarFallback className="bg-green-400 text-white text-2xl font-bold">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{userName}</h1>
                  <p className="text-green-100">{userPhone}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-yellow-500">⭐ 4.9</Badge>
                    <span className="text-sm">{completedOrders.length} заказов</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <Card className="border-0 shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Заработано всего</p>
                      <p className="text-3xl font-bold text-green-600">
                        {completedOrders.reduce((sum, o) => sum + o.price, 0)} ₽
                      </p>
                    </div>
                    <Icon name="TrendingUp" size={48} className="text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200"
                onClick={() => {
                  setUserRole(null);
                  setUserName('');
                  setUserPhone('');
                }}
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </>
        )}

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50">
          <div className="flex">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'home' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-medium">Главная</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'orders' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon name="ClipboardList" size={24} />
              <span className="text-xs font-medium">История</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  const myOrders = orders.filter(o => o.clientName === userName || o.clientName === 'Анна Петрова');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-in slide-in-from-top">
          {notification}
        </div>
      )}

      {activeTab === 'home' && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-6 rounded-b-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarFallback className="bg-blue-400 text-white font-bold">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-blue-100">Привет!</p>
                  <p className="font-bold text-lg">{userName.split(' ')[0]}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <Icon name="Bell" size={22} />
              </Button>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-blue-100">Адрес</p>
                  <p className="font-medium text-sm">{bookingAddress}</p>
                </div>
                <Icon name="ChevronRight" size={20} />
              </div>
            </div>
          </div>

          <div className="px-4 -mt-4">
            {myOrders.filter(o => o.status === 'accepted' || o.status === 'in_progress').length > 0 && (
              <Card className="border-0 shadow-xl mb-4">
                <CardContent className="p-4">
                  {myOrders.filter(o => o.status === 'accepted' || o.status === 'in_progress')[0] && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Icon name="Sparkles" className="text-green-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Активный заказ</p>
                        <p className="text-xs text-muted-foreground">
                          {myOrders.filter(o => o.status === 'accepted' || o.status === 'in_progress')[0].service} • {new Date(myOrders.filter(o => o.status === 'accepted' || o.status === 'in_progress')[0].date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <Badge className="bg-green-500">В работе</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <h2 className="font-bold mb-3">Услуги</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setIsBookingOpen(true);
                  }}
                  className="bg-white rounded-2xl p-3 shadow-sm active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon name={service.icon as any} className="text-blue-600" size={24} />
                  </div>
                  <p className="text-xs font-medium text-center leading-tight mb-1">{service.title}</p>
                  <p className="text-xs text-blue-600 font-bold text-center">{service.price} ₽</p>
                </button>
              ))}
            </div>

            <Card className="border-0 shadow bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon name="Gift" className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Первый заказ -20%</p>
                  <p className="text-xs text-muted-foreground">Промокод: ПЕРВЫЙ</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <>
          <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
            <h1 className="font-bold text-xl">Мои заказы</h1>
          </div>

          <div className="p-4 space-y-3">
            {myOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {getStatusBadge(order.status)}
                      <p className="font-bold mt-2">{order.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в {order.time}
                      </p>
                    </div>
                    <p className="font-bold text-lg text-blue-600">{order.price} ₽</p>
                  </div>

                  {order.workerName && (
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span>Исполнитель: {order.workerName}</span>
                    </div>
                  )}

                  {(order.status === 'new' || order.status === 'accepted') && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Отменить заказ
                    </Button>
                  )}

                  {order.status === 'completed' && (
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const service = services.find(s => s.title === order.service);
                        if (service) {
                          setSelectedService(service);
                          setIsBookingOpen(true);
                        }
                      }}
                    >
                      Повторить заказ
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}

            {myOrders.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">У вас пока нет заказов</p>
                <Button onClick={() => setActiveTab('home')}>
                  Перейти к услугам
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'profile' && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-8 rounded-b-3xl">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarFallback className="bg-blue-400 text-white text-2xl font-bold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{userName}</h1>
                <p className="text-blue-100">{userPhone}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <Card className="border-0 shadow">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Мои адреса</p>
                    <p className="text-sm text-muted-foreground">{bookingAddress}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <Icon name="CreditCard" size={20} className="text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Способы оплаты</p>
                    <p className="text-sm text-muted-foreground">Карты и кошельки</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <Icon name="Gift" size={20} className="text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Бонусы и промокоды</p>
                    <p className="text-sm text-muted-foreground">0 бонусов</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full text-red-600 border-red-200"
              onClick={() => {
                setUserRole(null);
                setUserName('');
                setUserPhone('');
              }}
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </>
      )}

      <Sheet open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-xl">
              {selectedService?.title}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Стоимость</span>
                <span className="text-3xl font-bold text-blue-600">{selectedService?.price} ₽</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Адрес</label>
              <Input 
                value={bookingAddress}
                onChange={(e) => setBookingAddress(e.target.value)}
                placeholder="Укажите адрес"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Дата</label>
                <Input 
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Время</label>
                <Input 
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Комментарий</label>
              <Input 
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                placeholder="Пожелания к заказу"
              />
            </div>

            <Button 
              className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
              onClick={createOrder}
            >
              Заказать за {selectedService?.price} ₽
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs font-medium">Главная</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'orders' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon name="ClipboardList" size={24} />
            <span className="text-xs font-medium">Заказы</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs font-medium">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
