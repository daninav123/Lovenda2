import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { sendMessage, AIMessage } from '../services/ai';
import { saveWedding } from '../store/weddingSlice';

interface FormData {
  name: string;
  dates: string;
  location: string;
  roles: string;
  palette: string;
  typography: string;
}

const initialData: FormData = {
  name: '',
  dates: '',
  location: '',
  roles: '',
  palette: '',
  typography: '',
};

export default function OnboardingChat() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // start conversation
    const init = async () => {
      const reply = await sendMessage([{ role: 'system', content: 'start' }]);
      setMessages([reply]);
    };
    init();
  }, []);

  const handleSend = async () => {
    if (!input) return;
    const userMessage: AIMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const reply = await sendMessage([...newMessages]);
    setMessages([...newMessages, reply]);

    const value = input;
    switch (step) {
      case 0:
        setData(d => ({ ...d, name: value }));
        break;
      case 1:
        setData(d => ({ ...d, dates: value }));
        break;
      case 2:
        setData(d => ({ ...d, location: value }));
        break;
      case 3:
        setData(d => ({ ...d, roles: value }));
        break;
      case 4:
        setData(d => ({ ...d, palette: value }));
        break;
      case 5:
        setData(d => ({ ...d, typography: value }));
        dispatch(saveWedding({ ...d, typography: value }));
        router.push('/dashboard');
        return;
    }
    setStep(step + 1);
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <button style={{ position: 'absolute', top: 10, right: 10 }} onClick={handleSkip}>
        Omitir
      </button>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ margin: '0.5rem 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '16px',
              background: m.role === 'user' ? '#DCF8C6' : '#EEE'
            }}>{m.content}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '1rem', borderTop: '1px solid #ccc' }}>
        <input
          style={{ flex: 1, marginRight: '0.5rem' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
