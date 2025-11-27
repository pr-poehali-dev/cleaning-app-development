import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  features: string[];
}

const services: Service[] = [
  {
    id: '1',
    title: 'Генеральная уборка',
    description: 'Комплексная уборка всех помещений',
    price: 'от 3500 ₽',
    icon: 'Home',
    features: ['Влажная уборка', 'Мытье окон', 'Чистка сантехники', 'Уборка кухни']
  },
  {
    id: '2',
    title: 'Поддерживающая уборка',
    description: 'Регулярная уборка помещений',
    price: 'от 1800 ₽',
    icon: 'Sparkles',
    features: ['Пылесос', 'Протирка поверхностей', 'Вынос мусора', 'Мытье полов']
  },
  {
    id: '3',
    title: 'Уборка после ремонта',
    description: 'Профессиональная уборка после стройки',
    price: 'от 5000 ₽',
    icon: 'Hammer',
    features: ['Удаление пыли', 'Мытье окон', 'Чистка от краски', 'Генеральная уборка']
  },
  {
    id: '4',
    title: 'Химчистка мебели',
    description: 'Глубокая чистка мягкой мебели',
    price: 'от 2500 ₽',
    icon: 'Sofa',
    features: ['Диваны и кресла', 'Матрасы', 'Ковры', 'Удаление пятен']
  },
  {
    id: '5',
    title: 'Мойка окон',
    description: 'Профессиональная мойка окон',
    price: 'от 150 ₽/м²',
    icon: 'Square',
    features: ['Внутренняя мойка', 'Внешняя мойка', 'Рамы', 'Без разводов']
  },
  {
    id: '6',
    title: 'Офисная уборка',
    description: 'Комплексная уборка офисов',
    price: 'от 2000 ₽',
    icon: 'Building',
    features: ['Кабинеты', 'Переговорные', 'Кухня', 'Санузлы']
  }
];

interface Order {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'active' | 'completed' | 'cancelled';
  price: string;
  address: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    service: 'Генеральная уборка',
    date: '28 ноября 2024',
    time: '14:00',
    status: 'active',
    price: '3500 ₽',
    address: 'ул. Примерная, д. 5, кв. 10'
  },
  {
    id: '2',
    service: 'Поддерживающая уборка',
    date: '20 ноября 2024',
    time: '10:00',
    status: 'completed',
    price: '1800 ₽',
    address: 'ул. Примерная, д. 5, кв. 10'
  },
  {
    id: '3',
    service: 'Мойка окон',
    date: '15 ноября 2024',
    time: '12:00',
    status: 'completed',
    price: '2400 ₽',
    address: 'ул. Примерная, д. 5, кв. 10'
  }
];

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'orders' | 'services' | 'profile'>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-400';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeScreen === 'home' && (
        <div className="flex flex-col">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 pt-8 pb-6 rounded-b-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-blue-100 text-sm">Добро пожаловать!</p>
                <h1 className="text-2xl font-bold">Анна</h1>
              </div>
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarFallback className="bg-blue-400 text-white">АП</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/30 rounded-xl p-3">
                  <Icon name="MapPin" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-blue-100">Ваш адрес</p>
                  <p className="font-semibold">ул. Примерная, д. 5, кв. 10</p>
                </div>
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div className="px-4 -mt-6">
            <Card className="shadow-xl border-0 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Активный заказ</p>
                    <p className="font-bold text-lg">Генеральная уборка</p>
                    <p className="text-sm text-muted-foreground">28 ноября в 14:00</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 mb-2">В работе</Badge>
                    <p className="font-bold text-lg text-primary">3500 ₽</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-lg font-bold mb-4">Популярные услуги</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {services.slice(0, 4).map((service) => (
                <Dialog key={service.id}>
                  <DialogTrigger asChild>
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-all active:scale-95 border-0 shadow-md"
                      onClick={() => setSelectedService(service)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Icon name={service.icon as any} className="text-primary" size={28} />
                        </div>
                        <p className="font-semibold text-sm mb-1">{service.title}</p>
                        <p className="text-xs text-primary font-bold">{service.price}</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{service.title}</DialogTitle>
                      <DialogDescription>{service.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                      <div>
                        <p className="font-semibold mb-2">Что входит:</p>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Icon name="Check" className="text-green-600" size={14} />
                              </div>
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-primary/5 rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Стоимость</span>
                          <span className="text-2xl font-bold text-primary">{service.price}</span>
                        </div>
                      </div>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-2xl border"
                      />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full h-12 text-base rounded-2xl" size="lg">
                        Забронировать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full mb-6 h-12 rounded-2xl"
              onClick={() => setActiveScreen('services')}
            >
              Посмотреть все услуги
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>

            <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Приведи друга</p>
                    <p className="text-sm text-muted-foreground">Получи скидку 500₽</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeScreen === 'orders' && (
        <div className="flex flex-col h-full">
          <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
            <h1 className="text-xl font-bold">Мои заказы</h1>
          </div>
          <div className="flex-1 px-4 py-4 space-y-3">
            {mockOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{order.service}</p>
                      <p className="text-sm text-muted-foreground">{order.date} в {order.time}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="MapPin" size={16} />
                    <p className="text-xs">{order.address}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="font-bold text-lg text-primary">{order.price}</span>
                    {order.status === 'active' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          Отменить
                        </Button>
                        <Button size="sm" className="rounded-xl">
                          Детали
                        </Button>
                      </div>
                    )}
                    {order.status === 'completed' && (
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Повторить
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeScreen === 'services' && (
        <div className="flex flex-col h-full">
          <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
            <h1 className="text-xl font-bold">Все услуги</h1>
          </div>
          <div className="flex-1 px-4 py-4 space-y-3">
            {services.map((service) => (
              <Dialog key={service.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all border-0 shadow-md"
                    onClick={() => setSelectedService(service)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Icon name={service.icon as any} className="text-primary" size={28} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold mb-1">{service.title}</p>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <p className="text-lg font-bold text-primary">{service.price}</p>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] rounded-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{service.title}</DialogTitle>
                    <DialogDescription>{service.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div>
                      <p className="font-semibold mb-2">Что входит:</p>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon name="Check" className="text-green-600" size={14} />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Стоимость</span>
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Выберите дату</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-2xl border"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Выберите время</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full h-12 text-base rounded-2xl" size="lg">
                      Забронировать за {service.price}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}

      {activeScreen === 'profile' && (
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 pt-8 pb-12 rounded-b-3xl">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarFallback className="bg-blue-400 text-white text-2xl">АП</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Анна Петрова</h1>
                <p className="text-blue-100">+7 (999) 123-45-67</p>
              </div>
            </div>
          </div>

          <div className="px-4 -mt-6 pb-4 space-y-3">
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon name="MapPin" className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Мои адреса</p>
                    <p className="text-sm text-muted-foreground">Управление адресами</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Icon name="Gift" className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Бонусы и промокоды</p>
                    <p className="text-sm text-muted-foreground">0 бонусов</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Icon name="CreditCard" className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Способы оплаты</p>
                    <p className="text-sm text-muted-foreground">Добавить карту</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Icon name="Bell" className="text-orange-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Уведомления</p>
                    <p className="text-sm text-muted-foreground">Настройки</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon name="HelpCircle" className="text-gray-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Помощь</p>
                    <p className="text-sm text-muted-foreground">Центр поддержки</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon name="Settings" className="text-gray-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Настройки</p>
                    <p className="text-sm text-muted-foreground">Приложение</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full h-12 rounded-2xl text-red-600 border-red-200 hover:bg-red-50 mt-6">
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
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeScreen === 'home' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs mt-1 font-medium">Главная</span>
          </button>
          <button
            onClick={() => setActiveScreen('services')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeScreen === 'services' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon name="Grid3x3" size={24} />
            <span className="text-xs mt-1 font-medium">Услуги</span>
          </button>
          <button
            onClick={() => setActiveScreen('orders')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeScreen === 'orders' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon name="ClipboardList" size={24} />
            <span className="text-xs mt-1 font-medium">Заказы</span>
          </button>
          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeScreen === 'profile' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs mt-1 font-medium">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
