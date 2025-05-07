
import React from 'react';

const ReceiptHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <img 
        src="/lovable-uploads/153ce379-8cc5-4fd7-ae3b-0d0434c5e23c.png" 
        alt="Logo" 
        className="h-10 mx-auto mb-2"
      />
      <p className="text-sm text-muted-foreground">123 Automotive Ave</p>
      <p className="text-sm text-muted-foreground">Motorville, CA 90210</p>
      <p className="text-sm text-muted-foreground">Tel: (555) 123-4567</p>
    </div>
  );
};

export default ReceiptHeader;
