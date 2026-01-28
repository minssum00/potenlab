import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const { language } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError(language === 'ko' ? '비밀번호를 입력해주세요' : 'Please enter password');
      return;
    }
    onLogin(password);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-center mb-2">
            {language === 'ko' ? '관리자 로그인' : 'Admin Login'}
          </h1>
          
          <p className="text-center text-muted-foreground mb-8">
            {language === 'ko' ? '관리자 비밀번호를 입력해주세요' : 'Enter admin password'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">
                {language === 'ko' ? '비밀번호' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="mt-2 h-12 rounded-xl"
                placeholder={language === 'ko' ? '비밀번호를 입력하세요' : 'Enter password'}
              />
              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white"
            >
              {language === 'ko' ? '로그인' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
