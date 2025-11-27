import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    description: 'Комплексная уборка всех помещений с использованием профессиональных средств',
    price: 'от 3500 ₽',
    icon: 'Home',
    features: ['Влажная уборка', 'Мытье окон', 'Чистка сантехники', 'Уборка кухни']
  },
  {
    id: '2',
    title: 'Поддерживающая уборка',
    description: 'Регулярная уборка для поддержания чистоты в помещении',
    price: 'от 1800 ₽',
    icon: 'Sparkles',
    features: ['Пылесос', 'Протирка поверхностей', 'Вынос мусора', 'Мытье полов']
  },
  {
    id: '3',
    title: 'Уборка после ремонта',
    description: 'Профессиональная уборка помещений после строительных работ',
    price: 'от 5000 ₽',
    icon: 'Hammer',
    features: ['Удаление строительной пыли', 'Мытье окон', 'Чистка от краски', 'Генеральная уборка']
  },
  {
    id: '4',
    title: 'Химчистка мебели',
    description: 'Глубокая чистка мягкой мебели и текстиля профессиональным оборудованием',
    price: 'от 2500 ₽',
    icon: 'Sofa',
    features: ['Диваны и кресла', 'Матрасы', 'Ковры', 'Удаление пятен']
  },
  {
    id: '5',
    title: 'Мойка окон',
    description: 'Профессиональная мойка окон с внутренней и внешней стороны',
    price: 'от 150 ₽/м²',
    icon: 'Square',
    features: ['Внутренняя мойка', 'Внешняя мойка', 'Рамы и подоконники', 'Без разводов']
  },
  {
    id: '6',
    title: 'Офисная уборка',
    description: 'Комплексная уборка офисных помещений с гибким графиком',
    price: 'от 2000 ₽',
    icon: 'Building',
    features: ['Кабинеты', 'Переговорные', 'Кухня', 'Санузлы']
  }
];

const reviews = [
  {
    name: 'Анна Петрова',
    rating: 5,
    text: 'Отличный сервис! Клинеры приехали вовремя, работали очень аккуратно. Квартира сияет чистотой.',
    date: '15 ноября 2024'
  },
  {
    name: 'Михаил Соколов',
    rating: 5,
    text: 'Заказывали уборку после ремонта. Справились на ура! Рекомендую всем.',
    date: '10 ноября 2024'
  },
  {
    name: 'Елена Иванова',
    rating: 5,
    text: 'Пользуемся услугами регулярно. Всегда качественно и профессионально. Спасибо!',
    date: '5 ноября 2024'
  }
];

const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/6f20e5ee-4a27-4425-aded-487ffb89724c.jpg" 
                alt="Клик-Клин" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('services')} className="text-foreground hover:text-primary transition-colors font-medium">
                Услуги
              </button>
              <button onClick={() => setActiveTab('prices')} className="text-foreground hover:text-primary transition-colors font-medium">
                Прайс
              </button>
              <button onClick={() => setActiveTab('reviews')} className="text-foreground hover:text-primary transition-colors font-medium">
                Отзывы
              </button>
              <button onClick={() => setActiveTab('contacts')} className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </button>
            </nav>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="shadow-lg hidden sm:flex">
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Заказать
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button size="icon" className="shadow-lg sm:hidden">
                    <Icon name="Calendar" size={20} />
                  </Button>
                </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Забронировать уборку</DialogTitle>
                  <DialogDescription>
                    Выберите удобную дату и время, мы свяжемся с вами для подтверждения
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div>
                    <Label>Выберите услугу</Label>
                    <Select onValueChange={(value) => setSelectedService(services.find(s => s.id === value) || null)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите тип уборки" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Выберите дату</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border mt-2"
                    />
                  </div>

                  <div>
                    <Label>Время</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
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
                        <SelectItem value="17:00">17:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ваше имя</Label>
                      <Input placeholder="Введите имя" className="mt-2" />
                    </div>
                    <div>
                      <Label>Телефон</Label>
                      <Input placeholder="+7 (999) 999-99-99" className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <Label>Адрес</Label>
                    <Input placeholder="Улица, дом, квартира" className="mt-2" />
                  </div>

                  <div>
                    <Label>Комментарий</Label>
                    <Textarea placeholder="Дополнительные пожелания..." className="mt-2" rows={3} />
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="Check" size={18} className="mr-2" />
                    Подтвердить бронирование
                  </Button>
                </div>
              </DialogContent>
              </Dialog>
              <Button 
                size="icon" 
                variant="ghost" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t pt-4">
              <button 
                onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors font-medium"
              >
                Услуги
              </button>
              <button 
                onClick={() => { setActiveTab('prices'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors font-medium"
              >
                Прайс
              </button>
              <button 
                onClick={() => { setActiveTab('reviews'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors font-medium"
              >
                Отзывы
              </button>
              <button 
                onClick={() => { setActiveTab('contacts'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors font-medium"
              >
                Контакты
              </button>
            </nav>
          )}
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 text-base px-4 py-1">Профессиональный клининг</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-secondary leading-tight">
              Чистота, которой можно доверять
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональные услуги уборки для вашего дома и офиса. Гарантируем качество и пунктуальность.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-xl hover:shadow-2xl transition-shadow w-full sm:w-auto">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Забронировать сейчас
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Забронировать уборку</DialogTitle>
                    <DialogDescription>
                      Выберите удобную дату и время
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div>
                      <Label>Выберите услугу</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите тип уборки" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.title} - {service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Выберите дату</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border mt-2"
                      />
                    </div>
                    <div>
                      <Label>Время</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Ваше имя</Label>
                        <Input placeholder="Введите имя" className="mt-2" />
                      </div>
                      <div>
                        <Label>Телефон</Label>
                        <Input placeholder="+7 (999) 999-99-99" className="mt-2" />
                      </div>
                    </div>
                    <div>
                      <Label>Адрес</Label>
                      <Input placeholder="Улица, дом, квартира" className="mt-2" />
                    </div>
                    <Button className="w-full" size="lg">
                      Подтвердить бронирование
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" onClick={() => setActiveTab('prices')}>
                <Icon name="FileText" size={20} className="mr-2" />
                Посмотреть цены
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {[
              { icon: 'Shield', title: 'Гарантия качества', desc: 'Повторная уборка бесплатно, если не устроит' },
              { icon: 'Clock', title: 'Пунктуальность', desc: 'Приезжаем строго в назначенное время' },
              { icon: 'Award', title: 'Опытные клинеры', desc: 'Все специалисты с опытом от 2 лет' }
            ].map((item, idx) => (
              <Card key={idx} className="border-2 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="services">Услуги</TabsTrigger>
              <TabsTrigger value="prices">Прайс</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="animate-fade-in">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Наши услуги</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, idx) => (
                    <Card key={service.id} className="hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                      <CardHeader>
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon name={service.icon as any} className="text-primary" size={28} />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Icon name="Check" className="text-primary" size={16} />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-2xl font-bold text-primary">{service.price}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button onClick={() => setSelectedService(service)}>
                                Заказать
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{service.title}</DialogTitle>
                                <DialogDescription>{service.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 mt-4">
                                <div>
                                  <Label>Выберите дату</Label>
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date()}
                                    className="rounded-md border mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Время</Label>
                                  <Select>
                                    <SelectTrigger className="mt-2">
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
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Ваше имя</Label>
                                    <Input placeholder="Введите имя" className="mt-2" />
                                  </div>
                                  <div>
                                    <Label>Телефон</Label>
                                    <Input placeholder="+7 (999) 999-99-99" className="mt-2" />
                                  </div>
                                </div>
                                <div>
                                  <Label>Адрес</Label>
                                  <Input placeholder="Улица, дом, квартира" className="mt-2" />
                                </div>
                                <Button className="w-full" size="lg">
                                  Подтвердить бронирование
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prices" className="animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Прайс-лист</h3>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {services.map((service) => (
                        <div key={service.id} className="p-6 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon name={service.icon as any} className="text-primary" size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg mb-1">{service.title}</h4>
                                <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {service.features.map((feature, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-2xl font-bold text-primary mb-2">{service.price}</div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" onClick={() => setSelectedService(service)}>
                                    Заказать
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl">{service.title}</DialogTitle>
                                    <DialogDescription>{service.description}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-6 mt-4">
                                    <Calendar
                                      mode="single"
                                      selected={selectedDate}
                                      onSelect={setSelectedDate}
                                      disabled={(date) => date < new Date()}
                                      className="rounded-md border"
                                    />
                                    <div>
                                      <Label>Время</Label>
                                      <Select>
                                        <SelectTrigger className="mt-2">
                                          <SelectValue placeholder="Выберите время" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="09:00">09:00</SelectItem>
                                          <SelectItem value="10:00">10:00</SelectItem>
                                          <SelectItem value="11:00">11:00</SelectItem>
                                          <SelectItem value="12:00">12:00</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Ваше имя</Label>
                                        <Input placeholder="Введите имя" className="mt-2" />
                                      </div>
                                      <div>
                                        <Label>Телефон</Label>
                                        <Input placeholder="+7 (999) 999-99-99" className="mt-2" />
                                      </div>
                                    </div>
                                    <Button className="w-full" size="lg">
                                      Подтвердить бронирование
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Отзывы наших клиентов</h3>
                <div className="grid gap-6">
                  {reviews.map((review, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name="User" className="text-primary" size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold">{review.name}</h4>
                              <div className="flex gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-2">{review.text}</p>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Свяжитесь с нами</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Контактная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Phone" className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Телефон</div>
                          <div className="font-semibold">+7 (999) 123-45-67</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Mail" className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Email</div>
                          <div className="font-semibold">info@kliiningpro.ru</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="MapPin" className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Адрес</div>
                          <div className="font-semibold">Москва, ул. Примерная, д. 1</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Clock" className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Режим работы</div>
                          <div className="font-semibold">Ежедневно с 8:00 до 22:00</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Напишите нам</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div>
                          <Label>Ваше имя</Label>
                          <Input placeholder="Введите имя" className="mt-2" />
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          <Input placeholder="+7 (999) 999-99-99" className="mt-2" />
                        </div>
                        <div>
                          <Label>Сообщение</Label>
                          <Textarea placeholder="Ваше сообщение..." className="mt-2" rows={4} />
                        </div>
                        <Button className="w-full">
                          <Icon name="Send" size={18} className="mr-2" />
                          Отправить
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/6f20e5ee-4a27-4425-aded-487ffb89724c.jpg" 
                  alt="Клик-Клин" 
                  className="h-12 w-auto object-contain bg-white rounded-lg p-2"
                />
              </div>
              <p className="text-white/80">
                Профессиональные услуги клининга для вашего комфорта
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2 text-white/80">
                <li><button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">Услуги</button></li>
                <li><button onClick={() => setActiveTab('prices')} className="hover:text-white transition-colors">Прайс</button></li>
                <li><button onClick={() => setActiveTab('reviews')} className="hover:text-white transition-colors">Отзывы</button></li>
                <li><button onClick={() => setActiveTab('contacts')} className="hover:text-white transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/80">
                <li>+7 (999) 123-45-67</li>
                <li>info@kliiningpro.ru</li>
                <li>Ежедневно с 8:00 до 22:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>© 2024 Клик-Клин. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;