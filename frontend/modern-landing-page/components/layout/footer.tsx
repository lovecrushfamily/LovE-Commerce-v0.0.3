import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl">EcomStore</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted online shopping destination with quality products and excellent service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <div className="space-y-2 text-sm">
              <Link href="/help" className="block text-muted-foreground hover:text-primary">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/shipping" className="block text-muted-foreground hover:text-primary">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-muted-foreground hover:text-primary">
                Returns & Exchanges
              </Link>
              <Link href="/track" className="block text-muted-foreground hover:text-primary">
                Track Your Order
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="font-semibold">About</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/careers" className="block text-muted-foreground hover:text-primary">
                Careers
              </Link>
              <Link href="/press" className="block text-muted-foreground hover:text-primary">
                Press
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-primary">
                Blog
              </Link>
              <Link href="/affiliate" className="block text-muted-foreground hover:text-primary">
                Affiliate Program
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
              <Link href="/security" className="block text-muted-foreground hover:text-primary">
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EcomStore. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Payment Methods:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center">VISA</div>
              <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center">PP</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
