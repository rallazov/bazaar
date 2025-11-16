import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import StripeCheckoutForm from "@/components/StripeCheckoutForm";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { useLocation } from "wouter";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const useFakePayments = import.meta.env.VITE_USE_FAKE_PAYMENTS === 'true';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const { data: cartItems = [] } = useQuery<any[]>({
    queryKey: ["/api/cart"],
  });

  const steps = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "confirmation", label: "Confirmation" },
  ];

  const subtotal = cartItems.reduce((sum: number, item: any) => {
    const price = item.product?.salePrice
      ? parseFloat(item.product.salePrice)
      : parseFloat(item.product?.price || "0");
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.09;

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setCurrentStep("payment");
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    setCurrentStep("confirmation");
    setTimeout(() => {
      setLocation("/");
    }, 3000);
  };

  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={0} />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. You'll receive a confirmation email shortly.
              </p>
            </div>
            <Button onClick={() => setLocation("/")} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItems.length} />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep === step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : steps.findIndex((s) => s.id === currentStep) > idx
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        }`}
                      data-testid={`step-${step.id}`}
                    >
                      {steps.findIndex((s) => s.id === currentStep) > idx ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-sm">{idx + 1}</span>
                      )}
                    </div>
                    <span
                      className={`hidden md:inline text-sm font-medium ${currentStep === step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                        }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <Separator className="w-8 md:w-16" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === "shipping" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6" data-testid="text-shipping-title">
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingData.firstName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, firstName: e.target.value })
                          }
                          required
                          data-testid="input-first-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingData.lastName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, lastName: e.target.value })
                          }
                          required
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        required
                        data-testid="input-address"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, city: e.target.value })
                          }
                          required
                          data-testid="input-city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingData.state}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, state: e.target.value })
                          }
                          required
                          data-testid="input-state"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          value={shippingData.zip}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, zip: e.target.value })
                          }
                          required
                          data-testid="input-zip"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" data-testid="button-continue-payment">
                      Continue to Payment
                    </Button>
                  </form>
                </Card>
              )}

              {currentStep === "payment" && clientSecret && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6" data-testid="text-payment-title">
                    Payment Information
                  </h2>
                  {useFakePayments ? (
                    <div>
                      <p className="mb-4 text-muted-foreground">Fake payments mode is enabled for local testing.</p>
                      <Button
                        onClick={async () => {
                          try {
                            const resp = await fetch('/api/checkout/confirm', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              credentials: 'include',
                              body: JSON.stringify({
                                paymentIntentId: 'fake_pi_dev',
                                customerEmail: shippingData.email,
                                customerName: `${shippingData.firstName} ${shippingData.lastName}`,
                                shippingAddress: shippingData,
                              }),
                            });

                            const data = await resp.json();
                            if (resp.ok) {
                              handlePaymentSuccess(data.order.id);
                            } else {
                              console.error('Fake payment failed', data);
                            }
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="w-full"
                      >
                        Simulate Payment
                      </Button>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep('shipping')}
                          className="w-full"
                        >
                          Back to Shipping
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <StripeCheckoutForm
                          onSuccess={handlePaymentSuccess}
                          customerEmail={shippingData.email}
                          customerName={`${shippingData.firstName} ${shippingData.lastName}`}
                          shippingAddress={shippingData}
                        />
                      </Elements>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep('shipping')}
                          className="w-full"
                          data-testid="button-back-shipping"
                        >
                          Back to Shipping
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  checkoutLabel={currentStep === "shipping" ? "Review Order" : "Processing..."}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
