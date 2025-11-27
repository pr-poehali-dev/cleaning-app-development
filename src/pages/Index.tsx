import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type UserRole = 'client' | 'worker' | 'admin' | null;

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  duration: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Генеральная уборка',
    description: 'Комплексная уборка квартиры',
    price: '3500 ₽',
    icon: 'Home',
    duration: '3-4 часа'
  },
  {
    id: '2',
    title: 'Поддерживающая',
    description: 'Регулярная уборка',
    price: '1800 ₽',
    icon: 'Sparkles',
    duration: '2-3 часа'
  },
  {
    id: '3',
    title: 'После ремонта',
    description: 'Уборка после стройки',
    price: '5000 ₽',
    icon: 'Hammer',
    duration: '4-6 часов'
  },
  {
    id: '4',
    title: 'Химчистка',
    description: 'Мебель и текстиль',
    price: '2500 ₽',
    icon: 'Sofa',
    duration: '2-3 часа'
  },
  {
    id: '5',
    title: 'Мойка окон',
    description: 'Внутри и снаружи',
    price: '150 ₽/м²',
    icon: 'Square',
    duration: '1-2 часа'
  },
  {
    id: '6',
    title: 'Офис',
    description: 'Уборка офисов',
    price: '2000 ₽',
    icon: 'Building',
    duration: '2-3 часа'
  }
];

interface Order {
  id: string;
  clientName: string;
  service: string;
  address: string;
  date: string;
  time: string;
  status: 'new' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  price: string;
  phone: string;
  workerName?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    clientName: 'Анна Петрова',
    service: 'Генеральная уборка',
    address: 'ул. Ленина, д. 5, кв. 10',
    date: '28 ноября',
    time: '14:00',
    status: 'accepted',
    price: '3500 ₽',
    phone: '+7 999 123-45-67',
    workerName: 'Мария Иванова'
  },
  {
    id: '2',
    clientName: 'Сергей Смирнов',
    service: 'Мойка окон',
    address: 'пр. Мира, д. 12, кв. 45',
    date: '29 ноября',
    time: '10:00',
    status: 'new',
    price: '2400 ₽',
    phone: '+7 999 234-56-78'
  },
  {
    id: '3',
    clientName: 'Елена Кузнецова',
    service: 'Химчистка',
    address: 'ул. Садовая, д. 8, кв. 22',
    date: '27 ноября',
    time: '16:00',
    status: 'completed',
    price: '2500 ₽',
    phone: '+7 999 345-67-89',
    workerName: 'Ольга Соколова'
  }
];

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'orders' | 'profile'>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'accepted': return 'bg-yellow-500';
      case 'in_progress': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'accepted': return 'Принят';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <img 
                src="https://cdn.poehali.dev/files/6f20e5ee-4a27-4425-aded-487ffb89724c.jpg" 
                alt="Клик-Клин" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Войти в систему</CardTitle>
            <CardDescription>Выберите свою роль</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full h-14 text-base justify-start gap-4 bg-gradient-to-r from-blue-500 to-blue-600"
              onClick={() => {
                setUserRole('client');
                setIsAuthenticated(true);
              }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="User" size={24} />
              </div>
              <div className="text-left">
                <div className="font-semibold">Я клиент</div>
                <div className="text-xs opacity-90">Заказать уборку</div>
              </div>
            </Button>

            <Button 
              className="w-full h-14 text-base justify-start gap-4 bg-gradient-to-r from-green-500 to-green-600"
              onClick={() => {
                setUserRole('worker');
                setIsAuthenticated(true);
              }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Briefcase" size={24} />
              </div>
              <div className="text-left">
                <div className="font-semibold">Я работник</div>
                <div className="text-xs opacity-90">Принимать заказы</div>
              </div>
            </Button>

            <Button 
              className="w-full h-14 text-base justify-start gap-4 bg-gradient-to-r from-purple-500 to-purple-600"
              onClick={() => {
                setUserRole('admin');
                setIsAuthenticated(true);
              }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} />
              </div>
              <div className="text-left">
                <div className="font-semibold">Администратор</div>
                <div className="text-xs opacity-90">Управление системой</div>
              </div>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Или войдите</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Телефон</Label>
                <Input placeholder="+7 (999) 999-99-99" className="mt-1.5" />
              </div>
              <div>
                <Label>Код из SMS</Label>
                <Input placeholder="1234" className="mt-1.5" />
              </div>
              <Button variant="outline" className="w-full">
                Войти по SMS
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold">Админ-панель</h1>
                <p className="text-xs text-purple-100">Управление системой</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white"
              onClick={() => setIsAuthenticated(false)}
            >
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full rounded-none border-b bg-white h-12">
            <TabsTrigger value="orders" className="flex-1">Заказы</TabsTrigger>
            <TabsTrigger value="workers" className="flex-1">Работники</TabsTrigger>
            <TabsTrigger value="clients" className="flex-1">Клиенты</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="p-4 space-y-3">
            {mockOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className={getStatusColor(order.status) + ' mb-2'}>
                        {getStatusText(order.status)}
                      </Badge>
                      <p className="font-bold text-base">{order.service}</p>
                      <p className="text-sm text-muted-foreground">{order.date} в {order.time}</p>
                    </div>
                    <p className="font-bold text-lg text-purple-600">{order.price}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span>{order.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <span>{order.phone}</span>
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
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Edit" size={16} className="mr-1" />
                      Редактировать
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="workers" className="p-4 space-y-3">
            {['Мария Иванова', 'Ольга Соколова', 'Елена Петрова'].map((name, idx) => (
              <Card key={idx} className="border-0 shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-muted-foreground">+7 999 {Math.floor(Math.random() * 900 + 100)}-{Math.floor(Math.random() * 90 + 10)}-{Math.floor(Math.random() * 90 + 10)}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500 mb-1">Активен</Badge>
                      <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50 + 20)} заказов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="clients" className="p-4 space-y-3">
            {['Анна Петрова', 'Сергей Смирнов', 'Елена Кузнецова'].map((name, idx) => (
              <Card key={idx} className="border-0 shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-muted-foreground">+7 999 {Math.floor(Math.random() * 900 + 100)}-{Math.floor(Math.random() * 90 + 10)}-{Math.floor(Math.random() * 90 + 10)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">{Math.floor(Math.random() * 10 + 1)} заказов</p>
                      <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50 + 10)}000 ₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stats" className="p-4 space-y-3">
            <Card className="border-0 shadow bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <p className="text-purple-100 text-sm mb-1">Общая выручка</p>
                <p className="text-4xl font-bold">127 500 ₽</p>
                <p className="text-sm text-purple-100 mt-2">+12% за месяц</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0 shadow">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">45</p>
                  <p className="text-sm text-muted-foreground">Заказов</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">12</p>
                  <p className="text-sm text-muted-foreground">Работников</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (userRole === 'worker') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {activeScreen === 'home' && (
          <div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-6 rounded-b-3xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-white">
                    <AvatarFallback className="bg-green-400 text-white text-lg">МИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-green-100">Работник</p>
                    <p className="text-xl font-bold">Мария Иванова</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-500 mb-1">4.9 ⭐</Badge>
                  <p className="text-xs text-green-100">42 заказа</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">12 450 ₽</p>
                  <p className="text-xs text-green-100">За месяц</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-green-100">Активных</p>
                </div>
              </div>
            </div>

            <div className="px-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Новые заказы</h2>
                <Badge variant="secondary">2 новых</Badge>
              </div>
              
              <div className="space-y-3">
                {mockOrders.filter(o => o.status === 'new').map((order) => (
                  <Card key={order.id} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-base">{order.service}</p>
                          <p className="text-sm text-muted-foreground">{order.date} в {order.time}</p>
                        </div>
                        <p className="font-bold text-xl text-green-600">{order.price}</p>
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
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="X" size={16} className="mr-1" />
                          Отклонить
                        </Button>
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          <Icon name="Check" size={16} className="mr-1" />
                          Принять
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-lg font-bold mt-6 mb-3">Мои заказы</h2>
              <div className="space-y-3">
                {mockOrders.filter(o => o.status === 'accepted').map((order) => (
                  <Card key={order.id} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge className="bg-yellow-500 mb-2">Принят</Badge>
                          <p className="font-bold text-base">{order.service}</p>
                          <p className="text-sm text-muted-foreground">{order.date} в {order.time}</p>
                        </div>
                        <p className="font-bold text-xl text-green-600">{order.price}</p>
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                          <span>{order.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Phone" size={16} className="text-muted-foreground" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span>{order.address}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Icon name="Navigation" size={16} className="mr-2" />
                        Маршрут
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeScreen === 'orders' && (
          <div>
            <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
              <h1 className="text-xl font-bold">История заказов</h1>
            </div>
            <div className="p-4 space-y-3">
              {mockOrders.filter(o => o.status === 'completed').map((order) => (
                <Card key={order.id} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge className="bg-gray-500 mb-2">Завершен</Badge>
                        <p className="font-bold text-base">{order.service}</p>
                        <p className="text-sm text-muted-foreground">{order.date} в {order.time}</p>
                      </div>
                      <p className="font-bold text-lg text-green-600">{order.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeScreen === 'profile' && (
          <div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-8 rounded-b-3xl">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-white">
                  <AvatarFallback className="bg-green-400 text-white text-2xl">МИ</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Мария Иванова</h1>
                  <p className="text-green-100">+7 999 123-45-67</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-yellow-500">4.9 ⭐</Badge>
                    <span className="text-sm text-green-100">42 заказа</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mt-4 space-y-3">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Заработано за месяц</p>
                      <p className="text-3xl font-bold text-green-600">12 450 ₽</p>
                    </div>
                    <Icon name="TrendingUp" size={40} className="text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                  <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50">
                    <Icon name="Calendar" size={20} className="text-muted-foreground" />
                    <span className="font-medium">График работы</span>
                  </button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                  <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50">
                    <Icon name="DollarSign" size={20} className="text-muted-foreground" />
                    <span className="font-medium">Выплаты</span>
                  </button>
                </CardContent>
              </Card>

              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200"
                onClick={() => setIsAuthenticated(false)}
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="flex items-center justify-around h-16">
            <button
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                activeScreen === 'home' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs mt-1">Главная</span>
            </button>
            <button
              onClick={() => setActiveScreen('orders')}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                activeScreen === 'orders' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon name="ClipboardList" size={24} />
              <span className="text-xs mt-1">История</span>
            </button>
            <button
              onClick={() => setActiveScreen('profile')}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                activeScreen === 'profile' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs mt-1">Профиль</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeScreen === 'home' && (
        <div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-6 rounded-b-3xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarFallback className="bg-blue-400 text-white">АП</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-blue-100">Привет!</p>
                  <p className="text-lg font-bold">Анна</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <Icon name="Bell" size={22} />
              </Button>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-blue-100">Адрес</p>
                  <p className="font-medium text-sm">ул. Ленина, д. 5, кв. 10</p>
                </div>
                <Icon name="ChevronDown" size={20} />
              </div>
            </div>
          </div>

          <div className="px-4 -mt-4">
            <Card className="border-0 shadow-xl mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Icon name="Sparkles" className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Следующая уборка</p>
                    <p className="text-xs text-muted-foreground">28 ноября в 14:00</p>
                  </div>
                  <Badge className="bg-green-500">Скоро</Badge>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-base font-bold mb-3">Услуги</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="bg-white rounded-2xl p-3 shadow-sm active:scale-95 transition-transform"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon name={service.icon as any} className="text-blue-600" size={24} />
                  </div>
                  <p className="text-xs font-medium text-center leading-tight">{service.title}</p>
                  <p className="text-xs text-blue-600 font-semibold text-center mt-1">{service.price}</p>
                </button>
              ))}
            </div>

            {selectedService && (
              <Card className="border-0 shadow-lg mb-4 bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-lg">{selectedService.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                    </div>
                    <button onClick={() => setSelectedService(null)}>
                      <Icon name="X" size={20} className="text-muted-foreground" />
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Стоимость</span>
                      <span className="text-2xl font-bold text-blue-600">{selectedService.price}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div>
                      <Label className="text-xs">Дата</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Время</Label>
                      <Input type="time" className="mt-1" />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Icon name="Gift" className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Первый заказ -20%</p>
                  <p className="text-xs text-muted-foreground">Действует до конца месяца</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeScreen === 'orders' && (
        <div>
          <div className="bg-white border-b px-4 py-4 sticky top-0">
            <h1 className="text-xl font-bold">Мои заказы</h1>
          </div>
          <div className="p-4 space-y-3">
            {mockOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className={getStatusColor(order.status) + ' mb-2'}>
                        {getStatusText(order.status)}
                      </Badge>
                      <p className="font-bold">{order.service}</p>
                      <p className="text-sm text-muted-foreground">{order.date} в {order.time}</p>
                    </div>
                    <p className="font-bold text-lg text-blue-600">{order.price}</p>
                  </div>
                  {order.workerName && (
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span>Работник: {order.workerName}</span>
                    </div>
                  )}
                  {order.status === 'accepted' && (
                    <Button variant="outline" size="sm" className="w-full">
                      Отменить заказ
                    </Button>
                  )}
                  {order.status === 'completed' && (
                    <Button size="sm" className="w-full">Повторить заказ</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeScreen === 'profile' && (
        <div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-8 rounded-b-3xl">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarFallback className="bg-blue-400 text-white text-2xl">АП</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Анна Петрова</h1>
                <p className="text-blue-100">+7 999 123-45-67</p>
              </div>
            </div>
          </div>

          <div className="px-4 mt-4 space-y-3">
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                  <span className="font-medium">Мои адреса</span>
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50">
                  <Icon name="CreditCard" size={20} className="text-muted-foreground" />
                  <span className="font-medium">Способы оплаты</span>
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50">
                  <Icon name="Gift" size={20} className="text-muted-foreground" />
                  <span className="font-medium">Бонусы и промокоды</span>
                </button>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full text-red-600 border-red-200"
              onClick={() => setIsAuthenticated(false)}
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeScreen === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs mt-1">Главная</span>
          </button>
          <button
            onClick={() => setActiveScreen('orders')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeScreen === 'orders' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon name="ClipboardList" size={24} />
            <span className="text-xs mt-1">Заказы</span>
          </button>
          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeScreen === 'profile' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs mt-1">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
