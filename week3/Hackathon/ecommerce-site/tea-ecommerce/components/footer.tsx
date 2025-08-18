const footerSections = [
  {
    title: "COLLECTIONS",
    links: ["Black teas", "Green teas", "White teas", "Herbal teas", "Matcha", "Chai", "Oolong", "Rooibos", "Teaware"],
  },
  {
    title: "LEARN",
    links: ["About us", "About our teas", "Tea academy"],
  },
  {
    title: "CUSTOMER SERVICE",
    links: ["Ordering and payment", "Delivery", "Privacy policy", "Terms & Conditions"],
  },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-outline/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-display text-sm">🍃</span>
              </div>
              <span className="text-headline-small font-display text-primary">Brand Name</span>
            </div>
            <p className="text-body-medium text-muted-foreground">
              We offer loose tea leaves of the best quality for your business. With a choice of more than 450 different
              kinds of loose tea, we can make a sophisticated selection that fits exactly in your kind of establishment.
            </p>
            <div className="text-body-small text-muted-foreground">ALL RIGHTS RESERVED BY Brand Name Co</div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-title-medium font-medium text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-body-medium text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-title-medium font-medium text-primary">CONTACT US</h3>
            <div className="space-y-2 text-body-medium text-muted-foreground">
              <p>📍 1 Hacker Way, Menlo Park, CA 94301, USA</p>
              <p>📧 Email: smoopsy@gmail.com</p>
              <p>📞 Tel: +92 9770369406</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
