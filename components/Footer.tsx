export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-home text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold">InteriorDesign</h3>
            </div>
            <p className="text-gray-400">
              Your trusted partner for premium interior design solutions in Visakhapatnam.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#designers" className="hover:text-white transition">Designers</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Home Interiors</li>
              <li>Office Design</li>
              <li>Kitchen Renovation</li>
              <li>Bedroom Design</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                +91 9021122430
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                info@interiordesign.com
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Gajuwaka, Visakhapatnam
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 InteriorDesign. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
