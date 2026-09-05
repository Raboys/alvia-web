import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IdentityCapture } from '@/components/identity/IdentityCapture';
import { PaymentSheet } from '@/components/ui/PaymentSheet';
import { GuardiaConfirm } from '@/components/guardia/GuardiaConfirm';
import { AuthCodePrompt } from '@/components/ui/AuthCodePrompt';
import Home from '@/app/home';
import Prescriptions from '@/app/prescriptions';

const noop = () => {};
const screen = new URLSearchParams(location.search).get('screen');
function CaptureApp() {
  const [codeDone, setCodeDone] = useState(screen !== 'authorization');
  const [codeVisible, setCodeVisible] = useState(screen === 'authorization');
  return (
  <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 766 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
    {screen === 'home' ? <Home /> : screen === 'prescriptions' ? <Prescriptions /> : <>
    <GuardiaConfirm insurerName="Meridiano OS" eligibilityStatus="eligible" onRetryEligibility={noop}
      requireCode codeDone={codeDone} onOpenCode={noop} requirePay payDone={false} payKind="copago" payLabel="$1.500" onOpenPay={noop}
      requireIdentity={false} identityDone onOpenIdentity={noop} reason="" onReasonChange={noop}
      submitting={false} onSubmit={noop} onBack={noop} />
    {screen === 'identity' ? <IdentityCapture visible context="guardia" token="capture-only" insurerName="Meridiano OS" mode="selfie" onDone={noop} onCancel={noop} />
      : screen === 'authorization' ? <AuthCodePrompt visible={codeVisible} length={4} insurerName="Meridiano OS" onSubmit={() => { setCodeDone(true); setCodeVisible(false); }} onCancel={noop} />
      : <PaymentSheet visible context="guardia" kind="copago" amountLabel="$1.500" insurerName="Meridiano OS" onPay={noop} onCancel={noop} />}
    </>}
  </SafeAreaProvider>
  );
}
createRoot(document.getElementById('root')!).render(<CaptureApp />);
